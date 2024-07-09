package com.gestionstock3.gestionstock.Modele;


import jakarta.persistence.*;

@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long article_id;

    private String article_nom;
    private String article_description;
    private double article_prix;
    private int article_quantite;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    // Getters and Setters

    public Long getArticle_id() {
        return article_id;
    }

    public void setArticle_id(Long article_id) {
        this.article_id = article_id;
    }

    public String getArticle_nom() {
        return article_nom;
    }

    public void setArticle_nom(String article_nom) {
        this.article_nom = article_nom;
    }

    public String getArticle_description() {
        return article_description;
    }

    public void setArticle_description(String article_description) {
        this.article_description = article_description;
    }

    public double getArticle_prix() {
        return article_prix;
    }

    public void setArticle_prix(double article_prix) {
        this.article_prix = article_prix;
    }

    public int getArticle_quantite() {
        return article_quantite;
    }

    public void setArticle_quantite(int article_quantite) {
        this.article_quantite = article_quantite;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }
}
