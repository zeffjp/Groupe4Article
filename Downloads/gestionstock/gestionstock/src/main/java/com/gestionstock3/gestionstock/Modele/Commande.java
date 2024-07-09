package com.gestionstock3.gestionstock.Modele;


import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commandenumero;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    private LocalDate commandedate;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    private int commandequantite;
    private double commandeprixtotal;
    private String commandestatut;

    // Getters and Setters

    public Long getCommandenumero() {
        return commandenumero;
    }

    public void setCommandenumero(Long commandenumero) {
        this.commandenumero = commandenumero;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public LocalDate getCommandedate() {
        return commandedate;
    }

    public void setCommandedate(LocalDate commandedeate) {
        this.commandedate = commandedeate;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public int getCommandequantite() {
        return commandequantite;
    }

    public void setCommandequantite(int commandequantite) {
        this.commandequantite = commandequantite;
    }

    public double getCommandeprixtotal() {
        return commandeprixtotal;
    }

    public void setCommandeprixtotal(double commandeprixtotal) {
        this.commandeprixtotal = commandeprixtotal;
    }

    public String getCommandestatut() {
        return commandestatut;
    }

    public void setCommandestatut(String commandestatut) {
        this.commandestatut = commandestatut;
    }
}
