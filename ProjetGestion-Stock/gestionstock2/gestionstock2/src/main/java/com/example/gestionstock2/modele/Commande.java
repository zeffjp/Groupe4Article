package com.example.gestionstock2.modele;

import jakarta.persistence.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.Temporal;

import java.util.Date;

@Entity
@Table(name = "commandes")
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCommande;

    @Column(nullable = false)
    private Date dateCommande;

    @Column(nullable = false)
    private Integer idClient;

    @Column(nullable = false)
    private Integer idArticle;

    @Column(nullable = false)
    private Integer quantiteCommandee;

    @Column(nullable = false)
    private Integer prixUnitaire;

    @Column(nullable = false)
    private String statut;
    @jakarta.persistence.Id
    private Long id;

    // Getters and Setters

    public Integer getIdCommande() {
        return idCommande;
    }

    public void setIdCommande(Integer idCommande) {
        this.idCommande = idCommande;
    }

    public Date getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(Date dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Integer getIdClient() {
        return idClient;
    }

    public void setIdClient(Integer idClient) {
        this.idClient = idClient;
    }

    public Integer getIdArticle() {
        return idArticle;
    }

    public void setIdArticle(Integer idArticle) {
        this.idArticle = idArticle;
    }

    public Integer getQuantiteCommandee() {
        return quantiteCommandee;
    }

    public void setQuantiteCommandee(Integer quantiteCommandee) {
        this.quantiteCommandee = quantiteCommandee;
    }

    public Integer getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(Integer prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
