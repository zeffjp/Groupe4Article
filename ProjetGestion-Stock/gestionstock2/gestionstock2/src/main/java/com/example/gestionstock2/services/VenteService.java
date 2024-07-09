package com.example.gestionstock2.services;

import com.example.gestionstock2.modele.Vente;

import java.util.List;

public interface VenteService {
    List<Vente> getAllVentes();
    Vente getVenteById(int id);
    Vente createVente(Vente vente);
    Vente updateVente(int id, Vente vente);
    void deleteVente(int id);
}
