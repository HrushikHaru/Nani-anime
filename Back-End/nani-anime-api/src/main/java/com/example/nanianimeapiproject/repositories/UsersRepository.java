package com.example.nanianimeapiproject.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nanianimeapiproject.entities.Users;

public interface UsersRepository extends JpaRepository<Users,Integer> {
	
	Optional<Users> findByUsername(String username);

}
