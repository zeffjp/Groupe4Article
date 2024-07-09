package com.gestionstock3.gestionstock.Modele;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;

    private String clientNom;
    private String clientPrénom;
    private String clientEmail;
    private String clientTéléphone;

    // Getters and Setters

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientNom() {
        return clientNom;
    }

    public void setClientNom(String clientNom) {
        this.clientNom = clientNom;
    }

    public String getClientPrénom() {
        return clientPrénom;
    }

    public void setClientPrénom(String clientPrénom) {
        this.clientPrénom = clientPrénom;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public String getClientTéléphone() {
        return clientTéléphone;
    }

    public void setClientTéléphone(String clientTéléphone) {
        this.clientTéléphone = clientTéléphone;
    }
}
