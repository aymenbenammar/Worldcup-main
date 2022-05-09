package com.projet.worldcup.services;


import com.projet.worldcup.dto.AjoutResponse;
import com.projet.worldcup.dto.LoginDto;
import com.projet.worldcup.models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers(String login);
    //AjoutResponse addUserDto(UserDto user);
    // AjoutResponse addUser(User user);
    User addOrUpdateUser(User user);

    User getUserByLogin(String login);

    Boolean verifyPassword(LoginDto loginDto);

    Boolean checkPassword(String pwdUser, String passwordToCheck);

    User getUserById(Long id);

    AjoutResponse deleteUser(long id);

}
