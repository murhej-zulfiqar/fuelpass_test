package com.ucig.fuelpass.exceptions;

public class UnAuthorizedException extends RuntimeException{

    private String message;

    public UnAuthorizedException() {
    }

    public UnAuthorizedException(String message) {
        super(message);
        this.message = message;
    }
}
