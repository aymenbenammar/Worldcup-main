package com.projet.worldcup.services;


import com.projet.worldcup.Dto.PlayerDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PlayerService {

    void createPlayer(PlayerDto playerDto);

    void updatePlayer(PlayerDto playerDto);

    void deletePlayerById(Long id);

    PlayerDto getPlayerById(Long id);

    List<PlayerDto> getAllPlayers();
}