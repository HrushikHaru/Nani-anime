package com.example.nanianimeapiproject.responses;

import java.util.Date;

public class UserInfoUpdateResponse {
	
	private String response;
	
	private Date date;

	public UserInfoUpdateResponse() {
		super();
	}

	public UserInfoUpdateResponse(String response, Date date) {
		super();
		this.response = response;
		this.date = date;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "UserInfoUpdateResponse [response=" + response + ", date=" + date + "]";
	}

}
