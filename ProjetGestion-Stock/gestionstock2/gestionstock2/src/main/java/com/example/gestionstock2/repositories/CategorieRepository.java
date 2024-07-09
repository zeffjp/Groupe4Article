package com.example.gestionstock2.repositories;

import com.example.gestionstock2.modele.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    // Ajoutez ici les méthodes personnalisées de requête si nécessaire
}
