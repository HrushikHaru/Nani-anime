package com.example.nanianimeapiproject.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.nanianimeapiproject.dtos.WatchListDto;
import com.example.nanianimeapiproject.dtos.WatchListsDto;
import com.example.nanianimeapiproject.entities.Users;
import com.example.nanianimeapiproject.entities.WatchList;
import com.example.nanianimeapiproject.repositories.UsersRepository;
import com.example.nanianimeapiproject.repositories.WatchListRepository;

@Service
public class WatchListService {
	
	private WatchListRepository watchListRepo;
	
	private UsersRepository userRepo;
	
	public WatchListService(WatchListRepository watchListRepo,UsersRepository userRepo) {
		this.watchListRepo = watchListRepo;
		this.userRepo = userRepo;
	}

	public void postAnimeAsWatchList(WatchListDto watchListDto) {
		
		int malId = watchListDto.getMal_id();
		int userId = watchListDto.getUserId();
		
		Set<Users> users = new HashSet<>();
		Users user = new Users(userId);
		user.setUser_id(userId);
		
		users.add(user);
		
		WatchList watchlist = new WatchList(malId,users);
		
		watchListRepo.save(watchlist);
	}

	public WatchListsDto getListOfWatchLists(int userId) {
		
		Users user =userRepo.findById(userId).get();
		
		Set<WatchList> watchLists = user.getWatchList();
		
		WatchListsDto watchList = new WatchListsDto();
		
		Set<Integer> malIds = new HashSet<>();
		
		for(WatchList watch:watchLists) {
			malIds.add(watch.getMalId());
		}
		
		watchList.setMalId(malIds);
		
		return watchList;
	}

	public void deleteAnimeFromWatchList(int userId, int malId) {
		Users currentUser = userRepo.findById(userId).get();
		
		Set<WatchList> watchLists = currentUser.getWatchList();
		
		int watchListToRemove = 0;
		
		for(WatchList watchList:watchLists) {
			if(watchList.getMalId() == malId) {
				watchListToRemove = watchList.getWatchListId();
			}
		}
		
		WatchList watchlist = new WatchList();
		watchlist.setWatchListId(watchListToRemove);
		watchlist.setMalId(malId);
		
		Set<Users> users = new HashSet<>();
		Users user = new Users();
		user.setUser_id(userId);
		users.add(user);
		
		watchlist.setUsers(users);
		
		watchListRepo.delete(watchlist);
	}
}
