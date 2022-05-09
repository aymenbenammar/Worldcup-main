package com.projet.worldcup.repository;

import com.projet.worldcup.models.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}