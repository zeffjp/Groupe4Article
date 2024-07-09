package com.example.gestionstock2.controllers;

import com.example.gestionstock2.modele.Commande;
import com.example.gestionstock2.services.CommandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    @GetMapping
    public ResponseEntity<List<Commande>> getAllCommandes() {
        List<Commande> commandes = commandeService.getAllCommandes();
        return new ResponseEntity<>(commandes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Commande> getCommandeById(@PathVariable int id) {
        Commande commande = commandeService.getCommandeById(id);
        return new ResponseEntity<>(commande, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Commande> addCommande(@RequestBody Commande commande) {
        Commande newCommande = commandeService.createCommande(commande);
        return new ResponseEntity<>(newCommande, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Commande> updateCommande(@PathVariable int id, @RequestBody Commande commandeDetails) {
        Commande updatedCommande = commandeService.updateCommande(id, commandeDetails);
        return new ResponseEntity<>(updatedCommande, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable int id) {
        commandeService.deleteCommande(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
