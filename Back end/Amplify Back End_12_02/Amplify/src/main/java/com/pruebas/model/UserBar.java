package com.pruebas.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "userBar")
@PrimaryKeyJoinColumn(name = "id")
public class UserBar extends User {

	@NotNull
	private String barName;
	@NotNull
	private String address;
	@Pattern(regexp = "^[0]{1}[9]{1}[0-9]{7}$", message = "Por favor ingrese un número de telefono válido")
	private String phone;
	@Pattern(regexp = "^[1-9]{1}[0-9]{11}$", message = "Por favor ingrese un número de RUT valido")
	private String rut;
	private String profilePic;
	@Size(max = 600)
	private String access_token;
	@Size(max = 600)
	private String refresh_token;
	@Size(max = 100)
	private String deviceID;
	@Size(max = 100)
	private String playList_id;
	private String musicGender;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "userBar")
	@JsonManagedReference
	private List<Item> items;

	private Double latitude;
	private Double longitude;

	public UserBar() {
	}

	public UserBar(UserType userType, String firstName, String lastName, String username, String password,
			String passwordConfirmation, String barName, String address, String phone, String rut, String email,
			String profilePic, String musicGender) {
		super(userType, firstName, lastName, username, password, passwordConfirmation, email);
		this.barName = barName;
		this.address = address;
		this.phone = phone;
		this.rut = rut;
		this.profilePic = profilePic;
		this.items = new ArrayList<>();
		this.musicGender = musicGender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRut() {
		return rut;
	}

	public void setRut(String rut) {
		this.rut = rut;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public String getBarName() {
		return barName;
	}

	public void setBarName(String barName) {
		this.barName = barName;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public String getAccess_token() {
		return access_token;
	}

	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}

	public String getRefresh_token() {
		return refresh_token;
	}

	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}

	public String getDeviceID() {
		return deviceID;
	}

	public void setDeviceID(String deviceID) {
		this.deviceID = deviceID;
	}

	public String getPlayList_id() {
		return playList_id;
	}

	public void setPlayList_id(String playList_id) {
		this.playList_id = playList_id;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	public String getMusicGender() {
		return musicGender;
	}

	public void setMusicGender(String musicGender) {
		this.musicGender = musicGender;
	}

	@Override
	public boolean passwordMatch(String password, String passwordConfirmation) {
		return password == passwordConfirmation;
	}

}
