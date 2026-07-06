package ao.isptec.eha.service;

import ao.isptec.eha.dto.CommonDtos.*;
import ao.isptec.eha.model.Badge;
import ao.isptec.eha.model.User;
import ao.isptec.eha.model.UserBadge;
import ao.isptec.eha.repository.BadgeRepository;
import ao.isptec.eha.repository.UserBadgeRepository;
import ao.isptec.eha.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public UserService(UserRepository userRepository, BadgeRepository badgeRepository,
                       UserBadgeRepository userBadgeRepository) {
        this.userRepository = userRepository;
        this.badgeRepository = badgeRepository;
        this.userBadgeRepository = userBadgeRepository;
    }

    @Transactional
    public UserDto updateProfile(User user, UpdateProfileRequest request) {
        user.setName(request.name());
        user.setBio(request.bio());
        return UserDto.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public List<BadgeDto> badges(User currentUser) {
        Map<Long, Instant> earned = currentUser == null ? Map.of()
                : userBadgeRepository.findByUserId(currentUser.getId()).stream()
                        .collect(Collectors.toMap(ub -> ub.getBadge().getId(), UserBadge::getEarnedAt));
        return badgeRepository.findAll().stream()
                .map((Badge badge) -> new BadgeDto(badge.getId(), badge.getName(),
                        badge.getDescription(), badge.getIcon(),
                        earned.containsKey(badge.getId()), earned.get(badge.getId())))
                .toList();
    }
}
