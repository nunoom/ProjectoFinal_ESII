package com.eha.gamificationservice.dto.response;

import java.util.List;

public record RankingResponse(
    List<UserRankDto> rankings,
    CurrentUserRankDto currentUser,
    String weekStart,
    String weekEnd,
    String category
) {
    public record UserRankDto(
        Integer position,
        Long userId,
        String userName,
        String photoUrl,
        Integer points,
        Integer level
    ) {}

    public record CurrentUserRankDto(
        Integer position,
        Integer points,
        Integer level
    ) {}
}
