package com.projet.worldcup.controllers;

import com.projet.worldcup.Dto.TeamDto;
import com.projet.worldcup.services.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    public List<TeamDto> getAllTeams() {
        return teamService.getAllTeams();
    }

    @PostMapping
    public void createTeam(@RequestBody TeamDto teamDto) {
        teamService.createTeam(teamDto);
    }

    @PutMapping
    public void updateTeam(@RequestBody TeamDto teamDto) {
        teamService.updateTeam(teamDto);
    }

    @DeleteMapping("/{id}")
    public void deleteTeamById(@PathVariable Long id) {
        teamService.deleteTeamById(id);
    }

    @GetMapping("/{id}")
    public TeamDto getTeamById(@PathVariable Long id) {
        return teamService.getTeamById(id);
    }
}