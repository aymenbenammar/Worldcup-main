package com.projet.worldcup.controllers;

import com.projet.worldcup.models.Role;
import com.projet.worldcup.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/allRoles")
    public List<Role> getRoles(){
        return roleService.getRoles();
    }

}