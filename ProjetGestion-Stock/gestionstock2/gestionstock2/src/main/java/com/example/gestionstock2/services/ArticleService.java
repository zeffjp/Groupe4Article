package com.example.gestionstock2.services;

import com.example.gestionstock2.modele.Article;

import java.util.List;

public interface ArticleService {
    List<Article> getAllArticles();
    Article getArticleById(int id);
    Article createArticle(Article article);
    Article updateArticle(int id, Article article);
    void deleteArticle(int id);
}
