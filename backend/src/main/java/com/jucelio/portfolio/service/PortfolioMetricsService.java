package com.jucelio.portfolio.service;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class PortfolioMetricsService {

    private final Counter contactRequests;
    private final Counter contactRateLimited;
    private final Counter resumeDownloads;

    public PortfolioMetricsService(MeterRegistry meterRegistry) {
        this.contactRequests = Counter.builder("portfolio.contact.requests")
                .description("Total de mensagens de contato processadas com sucesso")
                .register(meterRegistry);

        this.contactRateLimited = Counter.builder("portfolio.contact.rate_limited")
                .description("Total de requisições de contato bloqueadas por rate limiting")
                .register(meterRegistry);

        this.resumeDownloads = Counter.builder("portfolio.resume.downloads")
                .description("Total de downloads do currículo")
                .register(meterRegistry);
    }

    public void incrementContactRequests() {
        contactRequests.increment();
    }

    public void incrementContactRateLimited() {
        contactRateLimited.increment();
    }

    public void incrementResumeDownloads() {
        resumeDownloads.increment();
    }
}
