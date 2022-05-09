package com.projet.worldcup.services.impl;

import com.projet.worldcup.models.Role;
import com.projet.worldcup.repository.RoleRepository;
import com.projet.worldcup.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleDAO;

    @Override
    public List<Role> getRoles() {
        return roleDAO.findAll();
    }
}
