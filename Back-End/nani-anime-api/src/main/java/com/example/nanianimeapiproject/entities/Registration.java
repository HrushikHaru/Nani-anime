package com.example.nanianimeapiproject.entities;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Registration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reg_id;
	
	private String firstName;
	
	private String lastName;
	
	@Column(columnDefinition = "DATE")
	private Date dateOfBirth;
	
	private int age;
	
	@OneToOne(mappedBy = "registration",cascade = CascadeType.ALL)
	private Users users;
	
	public Registration() {
		
	}

	public Registration(String firstName, String lastName) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Registration(int reg_id, String firstName, String lastName) {
		super();
		this.reg_id = reg_id;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Registration(String firstName, String lastName, Users users) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.users = users;
	}

	public Registration(String firstName, String lastName, Date dateOfBirth, int age, Users users) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.age = age;
		this.users = users;
	}

	public Registration(int reg_id, String firstName, String lastName, Date dateOfBirth, int age) {
		super();
		this.reg_id = reg_id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.dateOfBirth = dateOfBirth;
		this.age = age;
	}

	public int getReg_id() {
		return reg_id;
	}

	public void setReg_id(int reg_id) {
		this.reg_id = reg_id;
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

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Registration [reg_id=" + reg_id + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", dateOfBirth=" + dateOfBirth + ", age=" + age + "]";
	}
	
}
