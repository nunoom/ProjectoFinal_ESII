package ao.isptec.eha.controller;

import ao.isptec.eha.dto.RankingDtos.RankingResponse;
import ao.isptec.eha.model.User;
import ao.isptec.eha.service.RankingService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/global")
    public RankingResponse global(@AuthenticationPrincipal User user) {
        return rankingService.global(user);
    }
}
