package com.jucelio.portfolio.service;

import com.jucelio.portfolio.exception.RateLimitExceededException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ContactRateLimitService {

    private final int maxRequests;
    private final Duration window;
    private final Map<String, Deque<Instant>> requestsByClient = new ConcurrentHashMap<>();

    public ContactRateLimitService(
            @Value("${portfolio.contact.rate-limit.max-requests:5}") int maxRequests,
            @Value("${portfolio.contact.rate-limit.window-minutes:10}") long windowMinutes
    ) {
        this.maxRequests = maxRequests;
        this.window = Duration.ofMinutes(windowMinutes);
    }

    public void check(HttpServletRequest request) {
        String clientKey = resolveClientIp(request);
        Instant now = Instant.now();
        Instant cutoff = now.minus(window);

        Deque<Instant> attempts = requestsByClient.computeIfAbsent(
                clientKey,
                ignored -> new ArrayDeque<>()
        );

        synchronized (attempts) {
            while (!attempts.isEmpty() && attempts.peekFirst().isBefore(cutoff)) {
                attempts.removeFirst();
            }

            if (attempts.size() >= maxRequests) {
                Instant oldest = attempts.peekFirst();
                long retryAfter = Math.max(
                        1,
                        Duration.between(now, oldest.plus(window)).toSeconds()
                );
                throw new RateLimitExceededException(retryAfter);
            }

            attempts.addLast(now);
        }

        cleanupStaleEntries(cutoff);
    }

    private String resolveClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }

        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }

        return request.getRemoteAddr();
    }

    private void cleanupStaleEntries(Instant cutoff) {
        if (requestsByClient.size() < 1000) {
            return;
        }

        requestsByClient.entrySet().removeIf(entry -> {
            Deque<Instant> attempts = entry.getValue();
            synchronized (attempts) {
                return attempts.isEmpty() || attempts.peekLast().isBefore(cutoff);
            }
        });
    }
}
