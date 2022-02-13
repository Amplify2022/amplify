package com.pruebas.dto;

public class SuccessDTO {
	private String message;

	public SuccessDTO() {
		this.setMessage("OK");
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
