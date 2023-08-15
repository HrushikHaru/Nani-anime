package com.example.nanianimeapiproject.dtos;

public class WatchListDto {
	
	private int mal_id;
	
	private int userId;

	public WatchListDto() {
		super();
	}

	public WatchListDto(int mal_id, int userId) {
		super();
		this.mal_id = mal_id;
		this.userId = userId;
	}

	public int getMal_id() {
		return mal_id;
	}

	public void setMal_id(int mal_id) {
		this.mal_id = mal_id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "WatchListDto [mal_id=" + mal_id + ", userId=" + userId + "]";
	}

}
