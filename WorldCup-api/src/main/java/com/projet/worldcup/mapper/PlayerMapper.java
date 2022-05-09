package com.projet.worldcup.mapper;

import com.projet.worldcup.Dto.PlayerDto;
import com.projet.worldcup.models.Player;
import org.mapstruct.Mapper;


@Mapper
public interface PlayerMapper {

    PlayerDto playerToPlayerDto(Player player);

    Player playerDtoToPlayer(PlayerDto playerDto);

}