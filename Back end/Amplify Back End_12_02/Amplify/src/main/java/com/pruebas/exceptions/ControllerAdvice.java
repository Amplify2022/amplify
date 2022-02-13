package com.pruebas.exceptions;

import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.pruebas.dto.ErrorDTO;

@org.springframework.web.bind.annotation.ControllerAdvice

public class ControllerAdvice extends ResponseEntityExceptionHandler {

	@ExceptionHandler(AmplifyException.class)
	public ResponseEntity<ErrorDTO> handleAmplifyException(AmplifyException ex) {
		return new ResponseEntity<>(new ErrorDTO(ex.getType().value(), ex.getMessage()), ex.getType());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDTO> handleException(Exception ex) {
		ex.printStackTrace();
		return new ResponseEntity<ErrorDTO>(new ErrorDTO(500, "Error interno en el servidor"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		ex.printStackTrace();
		return new ResponseEntity<Object>(new ErrorDTO(400, processFieldErrors(ex.getFieldErrors())),
				HttpStatus.BAD_REQUEST);

	}

	private String processFieldErrors(List<FieldError> fieldErrors) {
		StringBuilder sb = new StringBuilder();
		for (FieldError fieldError : fieldErrors) {
			sb.append(fieldError.getField());
			sb.append(": ");
			sb.append(fieldError.getDefaultMessage());
			sb.append(" | ");
		}
		return sb.toString();

	}

}
