package com.pruebas.dto;

import java.sql.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ClientDTO {
	
	//private Long id;
	@Pattern(regexp = "^[a-zA-Z]{1,20}$", message = "Ingrese un nombre válido, solo se admiten letras")
	private String firstName;
	@Pattern(regexp = "^[a-zA-Z]{1,20}$", message = "Ingrese un apellido válido, solo se admiten letras")
	private String lastName;	
	private String username;
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$",
			message = "La constraseña debe estar por compuesta por al menos una letra mayúscula, una minúscula,"
					+ "un digito y un caracter especial. Y debe tener entre 8 y 20 caracteres")
	private String password;
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$", 
			message = "La constraseña debe estar por compuesta por al menos una letra mayúscula, una minúscula,"
					+ "un digito y un caracter especial. Y debe tener entre 8 y 20 caracteres")
	private String passwordConfirmation;
	@Email
	private String email;
	@NotNull
	@Pattern(regexp = "^[0]{1}[9]{1}[0-9]{7}$", message = "Por favor ingrese un número de telefono válido")
	private String phone;
	@JsonFormat(pattern="dd-MM-yyyy")
	private Date dob;
	private String gender;
	private String profilePic;
	
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPasswordConfirmation() {
		return passwordConfirmation;
	}
	public void setPasswordConfirmation(String passwordConfirmation) {
		this.passwordConfirmation = passwordConfirmation;
	}
	public String getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

}
