package com.example.nanianimeapiproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nanianimeapiproject.entities.WatchList;

public interface WatchListRepository extends JpaRepository<WatchList, Integer> {
	

}
