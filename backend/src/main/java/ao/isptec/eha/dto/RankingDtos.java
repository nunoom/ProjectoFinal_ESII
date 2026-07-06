package ao.isptec.eha.dto;

import java.util.List;

public final class RankingDtos {

    private RankingDtos() {}

    public record RankingEntryDto(int position, Long userId, String userName, String photoUrl,
                                  int points, int level) {}

    public record CurrentUserRankDto(int position, int points, int level) {}

    public record RankingResponse(List<RankingEntryDto> rankings, CurrentUserRankDto currentUser) {}
}
