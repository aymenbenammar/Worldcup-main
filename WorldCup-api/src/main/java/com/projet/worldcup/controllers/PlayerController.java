package com.projet.worldcup.controllers;
import com.projet.worldcup.Dto.PlayerDto;
import com.projet.worldcup.services.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping
    public List<PlayerDto> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public void createPlayer(@RequestBody PlayerDto playerDto) {
        playerService.createPlayer(playerDto);
    }

    @PutMapping
    public void updatePlayer(@RequestBody PlayerDto playerDto) {
        playerService.updatePlayer(playerDto);
    }

    @DeleteMapping("/{id}")
    public void deletePlayerById(@PathVariable Long id) {
        playerService.deletePlayerById(id);
    }

    @GetMapping("/{id}")
    public PlayerDto getPlayerById(@PathVariable Long id) {
        return playerService.getPlayerById(id);
    }
}