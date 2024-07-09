package com.gestionstock3.gestionstock.Service;

import com.gestionstock3.gestionstock.Modele.Vente;

import java.util.List;
import java.util.Optional;

public interface VenteService {
    List<Vente> getAllVentes();
    Optional<Vente> getVenteById(Long venteId);
    Vente saveVente(Vente vente);
    void deleteVente(Long venteId);
}
