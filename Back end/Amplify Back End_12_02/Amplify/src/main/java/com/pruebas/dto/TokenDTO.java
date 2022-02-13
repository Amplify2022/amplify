package com.pruebas.dto;

public class TokenDTO {
	private String token;
	private String barRut;
	private String refresh_token;

	public TokenDTO(String token, String barRut, String refresh_token) {
		this.token = token;
		this.barRut = barRut;
		this.refresh_token = refresh_token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getBarRut() {
		return barRut;
	}

	public void setBarRut(String barRut) {
		this.barRut = barRut;
	}

	public String getRefresh_token() {
		return refresh_token;
	}

	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}

}
