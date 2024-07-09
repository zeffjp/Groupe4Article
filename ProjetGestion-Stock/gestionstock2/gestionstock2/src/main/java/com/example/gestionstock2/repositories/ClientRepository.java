package com.example.gestionstock2.repositories;

import com.example.gestionstock2.modele.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
    // Ajoutez ici les méthodes personnalisées de requête si nécessaire
}
