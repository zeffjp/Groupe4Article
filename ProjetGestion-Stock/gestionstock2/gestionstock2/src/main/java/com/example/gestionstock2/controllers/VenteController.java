package com.example.gestionstock2.controllers;

import com.example.gestionstock2.modele.Vente;
import com.example.gestionstock2.services.VenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ventes")
public class VenteController {

    @Autowired
    private VenteService venteService;

    @GetMapping
    public ResponseEntity<List<Vente>> getAllVentes() {
        List<Vente> ventes = venteService.getAllVentes();
        return new ResponseEntity<>(ventes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vente> getVenteById(@PathVariable int id) {
        Vente vente = venteService.getVenteById(id);
        return new ResponseEntity<>(vente, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Vente> addVente(@RequestBody Vente vente) {
        Vente newVente = venteService.createVente(vente);
        return new ResponseEntity<>(newVente, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vente> updateVente(@PathVariable int id, @RequestBody Vente venteDetails) {
        Vente updatedVente = venteService.updateVente(id, venteDetails);
        return new ResponseEntity<>(updatedVente, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVente(@PathVariable int id) {
        venteService.deleteVente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
