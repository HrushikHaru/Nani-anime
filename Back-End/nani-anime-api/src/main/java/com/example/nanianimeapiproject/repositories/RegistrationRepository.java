package com.example.nanianimeapiproject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.nanianimeapiproject.entities.Registration;

public interface RegistrationRepository extends JpaRepository<Registration,Integer> {

}
