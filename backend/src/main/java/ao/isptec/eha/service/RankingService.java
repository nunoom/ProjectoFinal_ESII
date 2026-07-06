package ao.isptec.eha.service;

import ao.isptec.eha.dto.RankingDtos.*;
import ao.isptec.eha.model.User;
import ao.isptec.eha.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RankingService {

    private final UserRepository userRepository;

    public RankingService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public RankingResponse global(User currentUser) {
        List<User> users = userRepository.findAllByOrderByPointsDesc();
        List<RankingEntryDto> rankings = new ArrayList<>();
        CurrentUserRankDto currentUserRank = null;

        for (int i = 0; i < users.size(); i++) {
            User user = users.get(i);
            int position = i + 1;
            rankings.add(new RankingEntryDto(position, user.getId(), user.getName(),
                    user.getPhotoUrl(), user.getPoints(), user.getLevel()));
            if (currentUser != null && user.getId().equals(currentUser.getId())) {
                currentUserRank = new CurrentUserRankDto(position, user.getPoints(), user.getLevel());
            }
        }
        return new RankingResponse(rankings, currentUserRank);
    }
}
