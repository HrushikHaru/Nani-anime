package com.example.nanianimeapiproject.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.nanianimeapiproject.dtos.UserInfoUpdateDto;
import com.example.nanianimeapiproject.dtos.UserRegistrationDto;
import com.example.nanianimeapiproject.dtos.UsersDto;
import com.example.nanianimeapiproject.entities.Registration;
import com.example.nanianimeapiproject.entities.Users;
import com.example.nanianimeapiproject.repositories.RegistrationRepository;
import com.example.nanianimeapiproject.repositories.UsersRepository;

@Service
public class UserRegistrationService {
	
	private RegistrationRepository regRepo;
	
	private UsersRepository userRepo;
	
	private PasswordEncoder passwordEncoder;
	
	public UserRegistrationService(RegistrationRepository regRepo, UsersRepository userRepo,PasswordEncoder passwordEncoder){
		this.regRepo = regRepo;
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}
	
	public void addUser(UserRegistrationDto userRegister) {
		
		String firstName = userRegister.getFirstName();
		String lastName = userRegister.getLastName();
		String date = userRegister.getDateOfBirth();
		SimpleDateFormat format = new SimpleDateFormat("ddMMMyyyy");
		Date addDate = null;
		try {
			addDate = format.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int age = userRegister.getAge();
		
		String username = userRegister.getUserName();
		
		
		String password = passwordEncoder.encode(userRegister.getPassWord());
		//passwordEncoder.encode(password);
		
		Users users = new Users(username,password);
		Registration register = new Registration(firstName,lastName,addDate,age,users);
		
		//One to One Mapping
		users.setRegistration(register);
		register.setUsers(users);
		
		
		register = regRepo.save(register); // Save the registration entity and assign the returned instance
		
	}

	public List<UsersDto>  showAllUsers() {
		
		List<Users> allUsers = userRepo.findAll();
		
		List<UsersDto> users = new ArrayList<>();
		
		for(Users user:allUsers) {
			
			UsersDto userDto = new UsersDto();
			userDto.setUserId(user.getUser_id());
			userDto.setUsername(user.getUsername());
			userDto.setPassword(user.getPassword());
			
			users.add(userDto);
			
		}
		
		return users;
	}
	
	public void updateUserInfo(UserInfoUpdateDto userInfo) {
		
		int userId = userInfo.getUserId();
		String firstName = userInfo.getFirstName();
		String lastName = userInfo.getLastName();
		String userName = userInfo.getUserName();
		String password = null;
		
		boolean includePassword = false;
		
		if(userInfo.getPassword() != "") {
			includePassword = true;
			password = passwordEncoder.encode(userInfo.getPassword());
		}
		
		Users existingUser = userRepo.findById(userId).orElseThrow();
		
		int reg_id =existingUser.getRegistration().getReg_id();
		
		if(includePassword) {
			existingUser.setUsername(userName);
			existingUser.setPassword(password);
		}else {
			existingUser.setUsername(userName);
		}
		
		//Saving the existing data back to database
		int age = existingUser.getRegistration().getAge();
		Date dateOfBirth = existingUser.getRegistration().getDateOfBirth();
		
		Registration register = new Registration(reg_id,firstName,lastName,dateOfBirth,age);
		
		existingUser.setRegistration(register);
		
		userRepo.save(existingUser);
	}
	
	public UserRegistrationDto getUserInfo(int userId) {
		
		Optional<Users> user =userRepo.findById(userId);
		
		Users currentUser = user.get();
		
		UserRegistrationDto userDto = new UserRegistrationDto();
		
		userDto.setFirstName(currentUser.getRegistration().getFirstName());
		userDto.setLastName(currentUser.getRegistration().getLastName());
		userDto.setUserName(currentUser.getUsername());
		userDto.setAge(currentUser.getRegistration().getAge());
		userDto.setDateOfBirth(currentUser.getRegistration().getDateOfBirth().toString());
		userDto.setPassWord(currentUser.getPassword());
		
		return userDto;
		
	}

}
