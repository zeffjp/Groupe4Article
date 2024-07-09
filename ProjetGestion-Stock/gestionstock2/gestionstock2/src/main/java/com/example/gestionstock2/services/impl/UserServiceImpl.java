package com.example.gestionstock2.services.impl;

import com.example.gestionstock2.exceptions.NotFoundException;
import com.example.gestionstock2.modele.User;
import com.example.gestionstock2.repositories.UserRepository;
import com.example.gestionstock2.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Utilisateur non trouvé"));
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(int id, User user) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("Utilisateur non trouvé");
        }
        user.setIdUser(id);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
