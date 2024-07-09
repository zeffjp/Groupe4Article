package com.example.gestionstock2.repositories;

import com.example.gestionstock2.modele.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Ajoutez ici les méthodes personnalisées de requête si nécessaire
}
