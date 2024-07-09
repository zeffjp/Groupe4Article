package com.example.gestionstock2.modele;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.Temporal;

import java.util.Date;

@Entity
@Table(name = "ventes")
public class Vente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idVente;

    @ManyToOne
    @JoinColumn(name = "idArticle", nullable = false)
    private Article article;

    @Column(nullable = false)
    private Integer quantiteVendue;

    @Column(nullable = false)
    private Date dateVente;

    @Column(nullable = false)
    private Double montant;
    @jakarta.persistence.Id
    private Long id;

    // Getters and Setters

    public Integer getIdVente() {
        return idVente;
    }

    public void setIdVente(Integer idVente) {
        this.idVente = idVente;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Integer getQuantiteVendue() {
        return quantiteVendue;
    }

    public void setQuantiteVendue(Integer quantiteVendue) {
        this.quantiteVendue = quantiteVendue;
    }

    public Date getDateVente() {
        return dateVente;
    }

    public void setDateVente(Date dateVente) {
        this.dateVente = dateVente;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
