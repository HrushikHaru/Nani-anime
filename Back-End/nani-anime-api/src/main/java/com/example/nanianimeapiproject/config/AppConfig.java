package com.example.nanianimeapiproject.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AppConfig {
	
	@Bean
	public SecurityFilterChain securityConfiguration(HttpSecurity http) throws Exception{
		
		http
		.cors()
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //It basically means that when you don't want any data to be persisted from a session in server-side and every request coming forth to the server needs to be treated as seperately and there is no state necessary to be maintained, that's when this is used.
		.and()
		.authorizeHttpRequests().requestMatchers(HttpMethod.POST,"/signup").permitAll()		//This basically means you can have access to these methods without authenticating it
		.anyRequest().authenticated()		//and any other requests must be authenticated.
		.and()
		.addFilterAfter(new JwtTokenGenerator(), BasicAuthenticationFilter.class)		//To generate JSON web token, this filter will be applied after sign up
		.addFilterBefore(new JwtTokenValidationFilter(), BasicAuthenticationFilter.class)	//The request method which will be hit to the end points must be validated to access the data.
		.csrf().disable()		//csrf is a security feature provided by Spring Security to prevent malicious websites or attackers from performing unauthorized actions on behalf of authenticated users.
		.formLogin().and().httpBasic();
		
		
		return http.build();
	}
		
		//To encode the password before storing it to the database
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
//	@Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5501/")); // Specify the allowed origin 
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // Specify the allowed HTTP methods
//        configuration.setAllowedHeaders(Arrays.asList("*")); // Specify the allowed headers
//        configuration.setAllowCredentials(true); // Allow credentials (e.g., cookies)
//        
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
	
}
