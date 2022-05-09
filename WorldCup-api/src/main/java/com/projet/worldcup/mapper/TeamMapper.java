package com.projet.worldcup.mapper;

import com.projet.worldcup.Dto.TeamDto;
import com.projet.worldcup.models.Team;
import org.mapstruct.Mapper;

@Mapper
public interface TeamMapper {

    TeamDto teamToTeamDto(Team team);

    Team teamDtoToTeam(TeamDto teamDto);

}