package com.projet.worldcup.Dto;

import com.projet.worldcup.models.Staff;
import lombok.*;


import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public final class TeamDto {

    private Long id;
    private String name;
    private String address;
}