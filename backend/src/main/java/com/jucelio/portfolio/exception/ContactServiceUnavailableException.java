package com.jucelio.portfolio.exception;

public class ContactServiceUnavailableException extends RuntimeException {

    public ContactServiceUnavailableException(String message) {
        super(message);
    }

    public ContactServiceUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
