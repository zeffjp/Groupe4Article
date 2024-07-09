package com.example.gestionstock2.services.impl;

import com.example.gestionstock2.exceptions.NotFoundException;
import com.example.gestionstock2.modele.Commande;
import com.example.gestionstock2.repositories.CommandeRepository;
import com.example.gestionstock2.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandeServiceImpl implements CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Override
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    @Override
    public Commande getCommandeById(int id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Commande non trouvée"));
    }

    @Override
    public Commande createCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    @Override
    public Commande updateCommande(int id, Commande commande) {
        if (!commandeRepository.existsById(id)) {
            throw new NotFoundException("Commande non trouvée");
        }
        commande.setIdCommande(id);
        return commandeRepository.save(commande);
    }

    @Override
    public void deleteCommande(int id) {
        commandeRepository.deleteById(id);
    }
}
