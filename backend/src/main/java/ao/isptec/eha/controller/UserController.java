package ao.isptec.eha.controller;

import ao.isptec.eha.dto.CommonDtos.*;
import ao.isptec.eha.model.User;
import ao.isptec.eha.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/me")
    public UserDto me(@AuthenticationPrincipal User user) {
        return UserDto.from(user);
    }

    @PutMapping("/users/me")
    public UserDto updateProfile(@AuthenticationPrincipal User user,
                                 @Valid @RequestBody UpdateProfileRequest request) {
        return userService.updateProfile(user, request);
    }

    @GetMapping("/badges")
    public List<BadgeDto> badges(@AuthenticationPrincipal User user) {
        return userService.badges(user);
    }
}
