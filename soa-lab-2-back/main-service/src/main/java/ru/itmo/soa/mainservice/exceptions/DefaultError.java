package ru.itmo.soa.mainservice.exceptions;

import lombok.Data;

@Data
public class DefaultError {
    private int code;
    private String message;

    public DefaultError(int code, String message) {
        this.code = code;
        this.message = message;
    }
}

