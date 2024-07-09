package com.gestionstock3.gestionstock.Service.Impl;

import com.gestionstock3.gestionstock.Modele.Article;
import com.gestionstock3.gestionstock.Repository.ArticleRepository;
import com.gestionstock3.gestionstock.Service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public Optional<Article> getArticleById(Long articleId) {
        return articleRepository.findById(articleId);
    }

    @Override
    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public void deleteArticle(Long articleId) {
        articleRepository.deleteById(articleId);
    }
}
