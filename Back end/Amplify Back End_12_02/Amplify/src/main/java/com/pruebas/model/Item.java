package com.pruebas.model;

import java.time.LocalDateTime;
import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Access(AccessType.FIELD)
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Long id;
	private String name;
	private String artist;
	private String image;
	private String uri;
	private int votes;
	@ManyToOne
	@JoinColumn(name = "userBar_id", nullable = false)
	@JsonBackReference
	private UserBar userBar;
	private LocalDateTime date = LocalDateTime.now();

	public Item() {
	}

	public Item(String name, String artist, String image, String uri, int votes, UserBar userBar, LocalDateTime date) {
		this.name = name;
		this.artist = artist;
		this.image = image;
		this.uri = uri;
		this.votes = votes;
		this.userBar = userBar;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUri() {
		return uri;
	}

	public void setUri(String uri) {
		this.uri = uri;
	}

	public int getVotes() {
		return votes;
	}

	public void setVotes(int votes) {
		this.votes = votes;
	}

	public UserBar getUserBar() {
		return userBar;
	}

	public void setUserBar(UserBar userBar) {
		this.userBar = userBar;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", uri=" + uri + ", votes=" + votes + "]";
	}

}
