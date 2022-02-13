package com.pruebas.exceptions;

import org.springframework.http.HttpStatus;

public class AmplifyException extends Exception {

	private HttpStatus type;
	private String message;

	public AmplifyException(HttpStatus type, String message) {
		super();
		this.type = type;
		this.message = message;
	}

	public HttpStatus getType() {
		return type;
	}

	public String getMessage() {
		return message;
	}
}
