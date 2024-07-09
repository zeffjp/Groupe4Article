package com.example.gestionstock2.repositories;

import com.example.gestionstock2.modele.Commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandeRepository extends JpaRepository<Commande, Integer> {
    // Ajoutez ici les méthodes personnalisées de requête si nécessaire
}
