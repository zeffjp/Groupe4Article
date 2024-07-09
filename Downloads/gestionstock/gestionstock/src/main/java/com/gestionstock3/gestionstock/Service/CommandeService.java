package com.gestionstock3.gestionstock.Service;

import com.gestionstock3.gestionstock.Modele.Commande;

import java.util.List;
import java.util.Optional;

public interface CommandeService {
    List<Commande> getAllCommandes();
    Optional<Commande> getCommandeById(Long commandenumero);
    Commande saveCommande(Commande commande);
    void deleteCommande(Long commandenumero);
}
