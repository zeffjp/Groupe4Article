package com.example.gestionstock2.services;

import com.example.gestionstock2.modele.Commande;

import java.util.List;

public interface CommandeService {
    List<Commande> getAllCommandes();
    Commande getCommandeById(int id);
    Commande createCommande(Commande commande);
    Commande updateCommande(int id, Commande commande);
    void deleteCommande(int id);
}
