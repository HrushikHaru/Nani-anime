package com.example.nanianimeapiproject.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.*;

import com.example.nanianimeapiproject.entities.Users;
import com.example.nanianimeapiproject.repositories.UsersRepository;

//This class is basically for where we don't want spring to create a username and password for us but we want it to be dynamically alloted by the end users.
@Service
public class UsersDetailsService implements UserDetailsService {
	
	@Autowired
	private UsersRepository userRepo;

	//This will load user in our a basic authentication, user will be logged in to the application using this
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		//There's an user in userdetails named as user, make sure you take a note of it while creating
		Optional<Users> opt = userRepo.findByUsername(username);
		
		if(opt.isPresent()) {
			Users user = opt.get();
			
			List<GrantedAuthority> authorities = new ArrayList<>();
			
			return new User(user.getUsername(),user.getPassword(),authorities);
		}
		
		throw new BadCredentialsException("User not found"+username);
	}

}
