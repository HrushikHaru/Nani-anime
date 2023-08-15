package com.example.nanianimeapiproject.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	
	private String username;
	
	private String password;
	
	@JsonIgnore		//This should be ignored or else it'll give you error for fasterxml bind exception (serialization issue)
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "reg_id",referencedColumnName = "reg_id")
	private Registration registration;
	
	@ManyToMany(mappedBy = "users")
	private Set<WatchList> watchList;

	public Users() {
		super();
	}
	
	public Users(int user_id) {
		super();
		this.user_id = user_id;
	}

	public Users(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public Users(int user_id, String username, String password) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.password = password;
	}

	public Users(int user_id, String username, String password, Registration registration) {
		super();
		this.user_id = user_id;
		this.username = username;
		this.password = password;
		this.registration = registration;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Registration getRegistration() {
		return registration;
	}

	public void setRegistration(Registration registration) {
		this.registration = registration;
	}

	public Set<WatchList> getWatchList() {
		return watchList;
	}

	public void setWatchList(Set<WatchList> watchList) {
		this.watchList = watchList;
	}

	@Override
	public String toString() {
		return "Users [user_id=" + user_id + ", username=" + username + ", password=" + password + "]";
	}

}
