package com.gestionstock3.gestionstock.Repository;


import com.gestionstock3.gestionstock.Modele.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
