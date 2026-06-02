package com.eha.contentservice.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class HeaderAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String userIdStr = request.getHeader("X-User-Id");
        String roleStr = request.getHeader("X-User-Role");

        if (userIdStr != null && roleStr != null) {
            try {
                Long userId = Long.parseLong(userIdStr);
                String authorityName = roleStr.startsWith("ROLE_") ? roleStr : "ROLE_" + roleStr;
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(authorityName));

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userId, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (NumberFormatException e) {
                // Ignore parsing errors
            }
        }

        filterChain.doFilter(request, response);
    }
}
