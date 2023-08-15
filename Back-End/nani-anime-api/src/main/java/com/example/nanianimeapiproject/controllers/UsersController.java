package com.example.nanianimeapiproject.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.nanianimeapiproject.config.JwtTokenGenerator;
import com.example.nanianimeapiproject.dtos.UserInfoUpdateDto;
import com.example.nanianimeapiproject.dtos.UserRegistrationDto;
import com.example.nanianimeapiproject.dtos.UsersDto;
import com.example.nanianimeapiproject.entities.Users;
import com.example.nanianimeapiproject.repositories.UsersRepository;
import com.example.nanianimeapiproject.responses.UserInfoUpdateResponse;
import com.example.nanianimeapiproject.services.UserRegistrationService;

@RestController
public class UsersController {

	private UserRegistrationService userRegService;
	
	private UsersRepository userRepo;
	
	private JwtTokenGenerator tokenGen;
	
	public UsersController(UserRegistrationService userRegService, UsersRepository userRepo,JwtTokenGenerator tokenGen) {
		this.userRegService = userRegService;
		this.userRepo = userRepo;
		this.tokenGen = tokenGen;
	}
	
	@GetMapping(path = "/users")
	public ResponseEntity<List<UsersDto>> showAllUsers(){
		
		try {
			List<UsersDto> allUsers = userRegService.showAllUsers();
			
			return new ResponseEntity<>(allUsers,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping(path="/signup")
	public ResponseEntity<UserRegistrationDto> signUpAsNewUser(@RequestBody UserRegistrationDto userRegister) {
		
		userRegService.addUser(userRegister);
		
		//URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{}")
		
		return ResponseEntity.created(null).build();
	}
	
	@GetMapping(path = "/signin")
	public ResponseEntity<UsersDto> signInHandler(Authentication auth) throws BadCredentialsException{
		
		Optional<Users> opt = userRepo.findByUsername(auth.getName());
		
		if(opt.isPresent()) {
			Users user = opt.get();
			
			UsersDto userDto = new UsersDto();
			
			userDto.setUserId(user.getUser_id());
			userDto.setUsername(user.getUsername());
			userDto.setPassword(user.getPassword());
			userDto.setToken(tokenGen.receiveToken());
			userDto.setFirstName(user.getRegistration().getFirstName());
			
			return new ResponseEntity<UsersDto>(userDto,HttpStatus.ACCEPTED);
		}
		
		throw new BadCredentialsException("User is not present");
	}
	
	@PutMapping(path = "/users")
	public ResponseEntity<UserInfoUpdateResponse> updateInfo(@RequestBody UserInfoUpdateDto userInfo){
		
		UserInfoUpdateResponse update = null;
		try {
			userRegService.updateUserInfo(userInfo);
			
			update = new UserInfoUpdateResponse();
			
			update.setResponse("Updated Successfully!");
			
			update.setDate(new Date());
			
			return new ResponseEntity<UserInfoUpdateResponse>(update,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		update = new UserInfoUpdateResponse();
		
		update.setResponse("Not Updated!");
		
		update.setDate(new Date());
		
		return new ResponseEntity<UserInfoUpdateResponse>(update,HttpStatus.BAD_REQUEST);
		
	}
	
	@GetMapping(path = "/users/{userId}")
	public ResponseEntity<UserRegistrationDto> getUserInfo(@PathVariable int userId){
		UserRegistrationDto userDto = null;
		try {
			userDto = userRegService.getUserInfo(userId);
			
			return new ResponseEntity<UserRegistrationDto>(userDto,HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<UserRegistrationDto>(userDto,HttpStatus.BAD_REQUEST);
	}
	
}
