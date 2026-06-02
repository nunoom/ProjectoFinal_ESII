package com.eha.gamificationservice.service;

import com.eha.gamificationservice.dto.response.*;
import com.eha.gamificationservice.model.*;
import com.eha.gamificationservice.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class GamificationService {

    private final RankingRepository rankingRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final BadgeRepository badgeRepository;
    private final CategoryRepository categoryRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public GamificationService(RankingRepository rankingRepository,
                               UserBadgeRepository userBadgeRepository,
                               BadgeRepository badgeRepository,
                               CategoryRepository categoryRepository) {
        this.rankingRepository = rankingRepository;
        this.userBadgeRepository = userBadgeRepository;
        this.badgeRepository = badgeRepository;
        this.categoryRepository = categoryRepository;
    }

    public void updatePoints(Long userId, Long categoryId, int pointsEarned) {
        LocalDate now = LocalDate.now();

        // 1. Update Global Ranking
        Ranking globalRanking = rankingRepository.findByUserIdAndPeriodTypeAndCategoryIsNull(userId, "GLOBAL")
            .orElseGet(() -> {
                Ranking r = new Ranking();
                r.setUserId(userId);
                r.setPeriodType("GLOBAL");
                r.setPeriodStart(LocalDate.of(2026, 1, 1));
                r.setPeriodEnd(LocalDate.of(2026, 12, 31));
                r.setPoints(0);
                return r;
            });
        globalRanking.setPoints(globalRanking.getPoints() + pointsEarned);
        rankingRepository.save(globalRanking);

        // 2. Update Category Ranking if categoryId is provided
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                .orElse(null);
            if (category != null) {
                Ranking catRanking = rankingRepository.findByUserIdAndPeriodTypeAndCategory(userId, "GLOBAL", category)
                    .orElseGet(() -> {
                        Ranking r = new Ranking();
                        r.setUserId(userId);
                        r.setPeriodType("GLOBAL");
                        r.setCategory(category);
                        r.setPeriodStart(LocalDate.of(2026, 1, 1));
                        r.setPeriodEnd(LocalDate.of(2026, 12, 31));
                        r.setPoints(0);
                        return r;
                    });
                catRanking.setPoints(catRanking.getPoints() + pointsEarned);
                rankingRepository.save(catRanking);
            }
        }

        // Recalculate rank positions
        recalculateRankPositions();

        // 3. Check for Badges
        checkAndAwardBadges(userId);
    }

    private void recalculateRankPositions() {
        // Re-rank global
        List<Ranking> globals = rankingRepository.findGlobalRankings("GLOBAL");
        for (int i = 0; i < globals.size(); i++) {
            globals.get(i).setRankPosition(i + 1);
            rankingRepository.save(globals.get(i));
        }
    }

    private void checkAndAwardBadges(Long userId) {
        Integer totalPoints = rankingRepository.sumPointsByUserId(userId);
        if (totalPoints == null) totalPoints = 0;

        List<Badge> allBadges = badgeRepository.findAll();
        for (Badge b : allBadges) {
            Optional<UserBadge> existing = userBadgeRepository.findByUserIdAndBadgeId(userId, b.getId());
            if (existing.isEmpty()) {
                boolean award = false;
                if (b.getPointsRequired() != null && b.getPointsRequired() > 0 && totalPoints >= b.getPointsRequired()) {
                    award = true;
                } else if (b.getId() == 1L && totalPoints > 0) { // First Quiz
                    award = true;
                }

                if (award) {
                    UserBadge ub = new UserBadge();
                    ub.setUserId(userId);
                    ub.setBadge(b);
                    userBadgeRepository.save(ub);

                    // Notify notification-service
                    try {
                        Map<String, Object> notif = Map.of(
                            "userId", userId,
                            "type", "BADGE",
                            "title", "Conquista Desbloqueada!",
                            "message", "Parabéns! Conquistou o badge: " + b.getName(),
                            "link", "/profile"
                        );
                        restTemplate.postForObject("http://notification-service:8087/api/notifications/internal", notif, Object.class);
                    } catch (Exception e) {
                        System.err.println("Failed to send badge notification: " + e.getMessage());
                    }
                }
            }
        }
    }

    public RankingResponse getGlobalRankings(Long currentUserId) {
        List<Ranking> rankings = rankingRepository.findGlobalRankings("GLOBAL");
        return buildRankingResponse(rankings, currentUserId, null, null);
    }

    public RankingResponse getCategoryRankings(String categorySlug, Long currentUserId) {
        List<Ranking> rankings = rankingRepository.findCategoryRankings("GLOBAL", categorySlug);
        return buildRankingResponse(rankings, currentUserId, categorySlug, null);
    }

    private RankingResponse buildRankingResponse(List<Ranking> rankings, Long currentUserId, String categorySlug, String period) {
        List<RankingResponse.UserRankDto> userRankings = new ArrayList<>();
        RankingResponse.CurrentUserRankDto currentUserDto = null;

        for (int i = 0; i < rankings.size(); i++) {
            Ranking r = rankings.get(i);
            String name = "Utilizador " + r.getUserId();
            String photo = null;
            int level = 1;

            // Fetch user info from user-service
            try {
                Map<?, ?> profile = restTemplate.getForObject(
                    "http://user-service:8082/api/users/internal/profile/" + r.getUserId(),
                    Map.class
                );
                if (profile != null) {
                    name = (String) profile.get("name");
                    photo = (String) profile.get("photoUrl");
                    level = (Integer) profile.get("level");
                }
            } catch (Exception e) {
                // Ignore profile service fetch error
            }

            userRankings.add(new RankingResponse.UserRankDto(
                r.getRankPosition() != null ? r.getRankPosition() : (i + 1),
                r.getUserId(),
                name,
                photo,
                r.getPoints(),
                level
            ));

            if (r.getUserId().equals(currentUserId)) {
                currentUserDto = new RankingResponse.CurrentUserRankDto(
                    r.getRankPosition() != null ? r.getRankPosition() : (i + 1),
                    r.getPoints(),
                    level
                );
            }
        }

        if (currentUserDto == null && currentUserId != null) {
            // Fetch level for current user
            int level = 1;
            try {
                Map<?, ?> profile = restTemplate.getForObject(
                    "http://user-service:8082/api/users/internal/profile/" + currentUserId,
                    Map.class
                );
                if (profile != null) {
                    level = (Integer) profile.get("level");
                }
            } catch (Exception e) {
                // Ignore
            }
            currentUserDto = new RankingResponse.CurrentUserRankDto(0, 0, level);
        }

        return new RankingResponse(
            userRankings,
            currentUserDto,
            LocalDate.now().with(java.time.DayOfWeek.MONDAY).toString(),
            LocalDate.now().with(java.time.DayOfWeek.SUNDAY).toString(),
            categorySlug
        );
    }

    public List<UserBadgeResponse> getUserBadges(Long userId) {
        List<UserBadge> ubs = userBadgeRepository.findByUserId(userId);
        return ubs.stream()
            .map(ub -> new UserBadgeResponse(
                ub.getBadge().getId(),
                ub.getBadge().getName(),
                ub.getBadge().getDescription(),
                ub.getBadge().getIcon(),
                ub.getEarnedAt()
            ))
            .toList();
    }
}
