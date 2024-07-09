package com.example.gestionstock2.services;

import com.example.gestionstock2.modele.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(int id);
    User createUser(User user);
    User updateUser(int id, User user);
    void deleteUser(int id);
}
