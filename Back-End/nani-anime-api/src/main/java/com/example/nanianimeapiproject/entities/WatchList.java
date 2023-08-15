package com.example.nanianimeapiproject.entities;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class WatchList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int watchListId;
	
	private int malId;
	
	@ManyToMany
	@JoinTable(
			name = "usersWatchlist",
			joinColumns = @JoinColumn(name="watchListId"),
			inverseJoinColumns = @JoinColumn(name="user_id")
			)
	private Set<Users> users;

	public WatchList() {
		super();
	}

	public WatchList(int malId, Set<Users> users) {
		super();
		this.malId = malId;
		this.users = users;
	}



	public WatchList(int watchListId, int malId, Set<Users> users) {
		super();
		this.watchListId = watchListId;
		this.malId = malId;
		this.users = users;
	}

	public int getWatchListId() {
		return watchListId;
	}

	public void setWatchListId(int watchListId) {
		this.watchListId = watchListId;
	}

	public int getMalId() {
		return malId;
	}

	public void setMalId(int malId) {
		this.malId = malId;
	}

	public Set<Users> getUsers() {
		return users;
	}

	public void setUsers(Set<Users> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "WatchList [watchListId=" + watchListId + ", malId=" + malId + ", users=" + users + "]";
	}

}
