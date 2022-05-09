package com.projet.worldcup.repository;

import com.projet.worldcup.models.Version;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VersionRepository extends JpaRepository<Version, String> {
}
