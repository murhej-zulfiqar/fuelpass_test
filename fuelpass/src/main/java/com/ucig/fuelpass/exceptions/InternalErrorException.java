package com.ucig.fuelpass.exceptions;

public class InternalErrorException extends RuntimeException{

    private String message;

    public InternalErrorException() {}

    public InternalErrorException(String msg) {
        super(msg);
        this.message = msg;
    }
}
