package com.example.gestionstock2.repositories;

import com.example.gestionstock2.modele.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    // Ajoutez ici les méthodes personnalisées de requête si nécessaire
}
