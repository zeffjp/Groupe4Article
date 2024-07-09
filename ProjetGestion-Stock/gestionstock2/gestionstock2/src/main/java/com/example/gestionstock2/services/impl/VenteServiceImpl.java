package com.example.gestionstock2.services.impl;

import com.example.gestionstock2.exceptions.NotFoundException;
import com.example.gestionstock2.modele.Vente;
import com.example.gestionstock2.repositories.VenteRepository;
import com.example.gestionstock2.services.VenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenteServiceImpl implements VenteService {

    @Autowired
    private VenteRepository venteRepository;

    @Override
    public List<Vente> getAllVentes() {
        return venteRepository.findAll();
    }

    @Override
    public Vente getVenteById(int id) {
        return venteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Vente non trouvée"));
    }

    @Override
    public Vente createVente(Vente vente) {
        return venteRepository.save(vente);
    }

    @Override
    public Vente updateVente(int id, Vente vente) {
        if (!venteRepository.existsById(id)) {
            throw new NotFoundException("Vente non trouvée");
        }
        vente.setIdVente(id);
        return venteRepository.save(vente);
    }

    @Override
    public void deleteVente(int id) {
        venteRepository.deleteById(id);
    }
}
