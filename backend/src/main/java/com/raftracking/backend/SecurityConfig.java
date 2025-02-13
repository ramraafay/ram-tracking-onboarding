package com.raftracking.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity // Enables method-level security annotations like @PreAuthorize
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity (not recommended
                // in production)
                .authorizeHttpRequests(
                        auth ->
                                auth.requestMatchers("/h2-console/**")
                                        .permitAll() // Allow access to H2 console
                                        .anyRequest()
                                        .authenticated() // Require authentication for all other
                        // requests
                        )
                .oauth2ResourceServer(oauth2 -> oauth2.jwt()); // Enable JWT-based authentication

        return http.build();
    }
}
