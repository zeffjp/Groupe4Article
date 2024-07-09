package com.gestionstock3.gestionstock.Controller;

import com.gestionstock3.gestionstock.Modele.Article;
import com.gestionstock3.gestionstock.Service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.getAllArticles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Optional<Article> article = articleService.getArticleById(id);
        if (article.isPresent()) {
            return ResponseEntity.ok(article.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleService.saveArticle(article);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article articleDetails) {
        Optional<Article> article = articleService.getArticleById(id);
        if (article.isPresent()) {
            Article existingArticle = article.get();
            existingArticle.setArticle_nom(articleDetails.getArticle_nom());
            existingArticle.setArticle_description(articleDetails.getArticle_description());
            existingArticle.setArticle_prix(articleDetails.getArticle_prix());
            existingArticle.setArticle_quantite(articleDetails.getArticle_quantite());
            existingArticle.setCategorie(articleDetails.getCategorie());
            Article updatedArticle = articleService.saveArticle(existingArticle);
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        Optional<Article> article = articleService.getArticleById(id);
        if (article.isPresent()) {
            articleService.deleteArticle(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
