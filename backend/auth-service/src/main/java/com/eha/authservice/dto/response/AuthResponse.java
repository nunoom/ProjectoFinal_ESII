package com.eha.authservice.dto.response;

public class AuthResponse {
    private String token;
    private String refreshToken;
    private UserInfo user;

    public AuthResponse(String token, String refreshToken, UserInfo user) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public UserInfo getUser() {
        return user;
    }

    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        private String role;

        public UserInfo(Long id, String name, String email, String role) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getRole() {
            return role;
        }
    }
}
