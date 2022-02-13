package com.pruebas.model;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "id")
public class UserClient extends User {

	private String phone;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date dob;
	private String gender;
	private String profilePic;

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

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public UserClient() {
	}

	public UserClient(UserType userType, String firstName, String lastName, String username, String password,
			String passwordConfirmation, String email, String phone, Date dob, String gender, String profilePic) {
		super(userType, firstName, lastName, username, password, passwordConfirmation, email);
		this.phone = phone;
		this.gender = gender;
		this.profilePic = profilePic;
		this.dob = dob;
	}

	@Override
	public boolean passwordMatch(String password, String passwordConfirmation) {
		return password == passwordConfirmation;
	}
}
