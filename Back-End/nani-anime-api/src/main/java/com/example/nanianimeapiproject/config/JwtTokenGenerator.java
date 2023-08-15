package com.example.nanianimeapiproject.config;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//This is our generator filter
@Component
public class JwtTokenGenerator extends OncePerRequestFilter {
	
	private String token = null;
	
	public String receiveToken() {
		return this.token;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //We will get the details for authentication when user signs in
		
		//If the credentials is true, then we need to generate token and pass it into client with user's object
		
		if(authentication != null) {
			SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());	//This key is used to generate token
			
			String jwt = Jwts.builder()
					.setIssuer("nani-anime") //name of the one who issued it
					.setIssuedAt(new Date())
					.claim("authorities", populateAuthorities(authentication.getAuthorities()))	//To extract authorities from the populateAuthorities
					.claim("username",authentication.getName())
					.setExpiration(new Date(new Date().getTime() + 300000000))
					.signWith(key).compact();
			
			//We need to pass this into request header, as we have a header named authorization in SecurityContext class as an header, we are going to use that to store the above info as authorization(Header) and get it in the client's side
			response.setHeader(SecurityContext.HEADER, jwt);
		}
		
		this.token = response.getHeader("Authorization");
		
		//filterChain.doFilter(request, response);
		
		if (request.getMethod().equals("OPTIONS")) {
            response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        } else { 
            filterChain.doFilter(request, response); 
        } 
		
	}
	
	public String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
		
		Set<String> authorities = new HashSet<>();
		
		for(GrantedAuthority authority:collection) {
			authorities.add(authority.getAuthority());
		}
		
		return String.join(",", authorities);
	}
	
	//Whenever the servlet path doesn't match up with "/signup" it'll return false, if it matches with signup then it'll generate token and sends with sign up
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		
		return !request.getServletPath().equals("/signin");
	}

}
