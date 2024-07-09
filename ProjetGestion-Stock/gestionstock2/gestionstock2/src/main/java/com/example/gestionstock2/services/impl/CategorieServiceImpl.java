package com.example.gestionstock2.services.impl;

import com.example.gestionstock2.exceptions.NotFoundException;
import com.example.gestionstock2.modele.Categorie;
import com.example.gestionstock2.repositories.CategorieRepository;
import com.example.gestionstock2.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieServiceImpl implements CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    @Override
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @Override
    public Categorie getCategorieById(int id) {
        return categorieRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Catégorie non trouvée"));
    }

    @Override
    public Categorie createCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public Categorie updateCategorie(int id, Categorie categorie) {
        if (!categorieRepository.existsById(id)) {
            throw new NotFoundException("Catégorie non trouvée");
        }
        categorie.setIdCategorie(id);
        return categorieRepository.save(categorie);
    }

    @Override
    public void deleteCategorie(int id) {
        categorieRepository.deleteById(id);
    }
}
