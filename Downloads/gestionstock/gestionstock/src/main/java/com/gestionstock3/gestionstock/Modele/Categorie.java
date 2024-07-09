package com.gestionstock3.gestionstock.Modele;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categorieId;

    private String categorieNom;
    private String categorieDescription;

    @OneToMany(mappedBy = "categorie")
    private List<Article> articles;

    // Getters and Setters

    public Long getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Long categorieId) {
        this.categorieId = categorieId;
    }

    public String getCategorieNom() {
        return categorieNom;
    }

    public void setCategorieNom(String categorieNom) {
        this.categorieNom = categorieNom;
    }

    public String getCategorieDescription() {
        return categorieDescription;
    }

    public void setCategorieDescription(String categorieDescription) {
        this.categorieDescription = categorieDescription;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}
