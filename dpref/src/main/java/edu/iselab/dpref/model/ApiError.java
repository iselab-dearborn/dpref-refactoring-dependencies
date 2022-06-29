package edu.iselab.dpref.model;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiError {

    protected HttpStatus status;

    protected String message;

    protected List<String> errors;

    public ApiError(HttpStatus status, String message, String error) {
        this(status, message, Arrays.asList(error));
    }

    public ApiError(HttpStatus status, String message) {
        this(status, message, Arrays.asList());
    }
}
