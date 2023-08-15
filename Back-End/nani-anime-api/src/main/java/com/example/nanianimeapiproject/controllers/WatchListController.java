package com.example.nanianimeapiproject.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.nanianimeapiproject.dtos.WatchListDto;
import com.example.nanianimeapiproject.dtos.WatchListsDto;
import com.example.nanianimeapiproject.responses.DeleteAnimeFromWatchListResponse;
import com.example.nanianimeapiproject.services.WatchListService;

@RestController
public class WatchListController {
	
	@Autowired
	private WatchListService watchListServ;
	
	@PostMapping(path = "/watchList")
	public ResponseEntity<WatchListDto> postWatchList(@RequestBody WatchListDto watchListDto) {
		
		watchListServ.postAnimeAsWatchList(watchListDto);
		
		return ResponseEntity.created(null).build();
	}
	
	@GetMapping(path ="/watchList/{userId}")
	public ResponseEntity<WatchListsDto> getDetailsOfAllWatchListPerUser(@PathVariable int userId){
		WatchListsDto watchList = null;
		
		try {
			watchList = watchListServ.getListOfWatchLists(userId);
			
			return new ResponseEntity<WatchListsDto>(watchList,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<WatchListsDto>(watchList,HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping(path ="/watchList/{userId}/{malId}")
	public ResponseEntity<DeleteAnimeFromWatchListResponse> removeAnimeFromWatchList(@PathVariable int userId,@PathVariable int malId) {
		DeleteAnimeFromWatchListResponse deleteAnime = null;
		
		try {
			watchListServ.deleteAnimeFromWatchList(userId,malId);
			
			deleteAnime = new DeleteAnimeFromWatchListResponse("The anime has been successfully Deleted",new Date());
			
			return new ResponseEntity<DeleteAnimeFromWatchListResponse>(deleteAnime,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<DeleteAnimeFromWatchListResponse>(deleteAnime,HttpStatus.BAD_REQUEST);
	}
	
}
