package com.example.gestionstock2.repositories;

import com.example.gestionstock2.modele.Vente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenteRepository extends JpaRepository<Vente, Integer> {
    // Ajoutez ici les méthodes personnalisées de requête si nécessaire
}
