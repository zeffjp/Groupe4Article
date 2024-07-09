package com.gestionstock3.gestionstock.Service;


import com.gestionstock3.gestionstock.Modele.Article;
import java.util.List;
import java.util.Optional;

public interface ArticleService {
    List<Article> getAllArticles();
    Optional<Article> getArticleById(Long article_id);
    Article saveArticle(Article article);
    void deleteArticle(Long article_id);
}
