package com.gestionstock3.gestionstock.Service.Impl;

import com.gestionstock3.gestionstock.Modele.Vente;
import com.gestionstock3.gestionstock.Repository.VenteRepository;
import com.gestionstock3.gestionstock.Service.VenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VenteServiceImpl implements VenteService {

    @Autowired
    private VenteRepository venteRepository;

    @Override
    public List<Vente> getAllVentes() {
        return venteRepository.findAll();
    }

    @Override
    public Optional<Vente> getVenteById(Long venteId) {
        return venteRepository.findById(venteId);
    }

    @Override
    public Vente saveVente(Vente vente) {
        return venteRepository.save(vente);
    }

    @Override
    public void deleteVente(Long venteId) {
        venteRepository.deleteById(venteId);
    }
}
