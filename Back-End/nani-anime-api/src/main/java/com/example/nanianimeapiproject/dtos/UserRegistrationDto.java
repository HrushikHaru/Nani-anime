package com.example.nanianimeapiproject.dtos;

public class UserRegistrationDto {
	
	private String firstName;
	
	private String lastName;
	
	private String dateOfBirth;
	
	private int age;
	
	private String userName; 
	
	private String passWord;
	
	public UserRegistrationDto() {
		
	}

	public UserRegistrationDto(String firstName, String lastName, String dateOfBirth, int age, String userName,
			String passWord) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.age = age;
		this.userName = userName;
		this.passWord = passWord;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	@Override
	public String toString() {
		return "UserRegistrationDto [firstName=" + firstName + ", lastName=" + lastName + ", dateOfBirth=" + dateOfBirth
				+ ", age=" + age + ", userName=" + userName + ", passWord=" + passWord + "]";
	}

}
