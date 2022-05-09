package com.projet.worldcup.services.impl;

import com.projet.worldcup.Dto.TeamDto;
import com.projet.worldcup.mapper.TeamMapper;
import com.projet.worldcup.repository.TeamRepository;
import com.projet.worldcup.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    private final TeamMapper teamMapper;

    @Override
    public void createTeam(TeamDto teamDto) {
        teamRepository.saveAndFlush(
                teamMapper.teamDtoToTeam(teamDto)
        );
    }

    @Override
    public void updateTeam(TeamDto teamDto) {
        teamRepository.save(teamMapper.teamDtoToTeam(teamDto));
    }

    @Override
    public void deleteTeamById(Long id) {
        teamRepository.deleteById(id);
    }

    @Override
    public TeamDto getTeamById(Long id) {
        return teamMapper.teamToTeamDto(teamRepository.findById(id).orElseThrow(RuntimeException::new));
    }

    @Override
    public List<TeamDto> getAllTeams() {
        return teamRepository.findAll()
                .stream()
                .map(teamMapper::teamToTeamDto)
                .collect(Collectors.toList());
    }

}