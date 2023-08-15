package com.example.nanianimeapiproject.dtos;

import java.util.Set;

public class WatchListsDto {
	
	private Set<Integer> malId;

	public WatchListsDto() {
		super();
	}

	public WatchListsDto(Set<Integer> malId) {
		super();
		this.malId = malId;
	}

	public Set<Integer> getMalId() {
		return malId;
	}

	public void setMalId(Set<Integer> malId) {
		this.malId = malId;
	}

	@Override
	public String toString() {
		return "WatchListsDto [malId=" + malId + "]";
	}

}
