package com.example.nanianimeapiproject.dtos;

public class UsersDto {
	
	private int userId;
	
	private String username;
	
	private String password;
	
	private String token;
	
	private String firstName;

	public UsersDto() {
		super();
	}

	public UsersDto(int userId, String username, String password, String token,String firstName) {
		super();
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.token = token;
		this.firstName = firstName;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
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
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Override
	public String toString() {
		return "UsersDto [userId=" + userId + ", username=" + username + ", password=" + password + ", token=" + token
				+ ", firstName=" + firstName + "]";
	}
}
