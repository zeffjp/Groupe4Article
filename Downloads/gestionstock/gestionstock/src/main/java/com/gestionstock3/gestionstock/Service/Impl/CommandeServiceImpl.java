package com.gestionstock3.gestionstock.Service.Impl;

import com.gestionstock3.gestionstock.Modele.Commande;
import com.gestionstock3.gestionstock.Repository.CommandeRepository;
import com.gestionstock3.gestionstock.Service.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeServiceImpl implements CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public Optional<Commande> getCommandeById(Long commandenumero) {
        return commandeRepository.findById(commandenumero);
    }

    @Override
    public Commande saveCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    @Override
    public void deleteCommande(Long commandenumero) {
        commandeRepository.deleteById(commandenumero);
    }
}
