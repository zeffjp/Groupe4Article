package com.example.gestionstock2.services.impl;

import com.example.gestionstock2.exceptions.NotFoundException;
import com.example.gestionstock2.modele.Article;
import com.example.gestionstock2.repositories.ArticleRepository;
import com.example.gestionstock2.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    @Override
    public Article getArticleById(int id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Article non trouvé"));
    }

    @Override
    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article updateArticle(int id, Article article) {
        if (!articleRepository.existsById(id)) {
            throw new NotFoundException("Article non trouvé");
        }
        article.setIdArticle(id);
        return articleRepository.save(article);
    }

    @Override
    public void deleteArticle(int id) {
        articleRepository.deleteById(id);
    }
}
