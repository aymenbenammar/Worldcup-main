package com.projet.worldcup.repository;


import com.projet.worldcup.Dto.TeamDto;
import com.projet.worldcup.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
}