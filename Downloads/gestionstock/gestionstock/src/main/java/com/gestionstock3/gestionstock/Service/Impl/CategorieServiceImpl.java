package com.gestionstock3.gestionstock.Service.Impl;
import com.gestionstock3.gestionstock.Modele.Categorie;
import com.gestionstock3.gestionstock.Repository.CategorieRepository;
import com.gestionstock3.gestionstock.Service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieServiceImpl implements CategorieService {

    @Autowired
    private CategorieRepository categorieRepository;

    @Override
    public List<Categorie> getAllCategories() {
        return categorieRepository.findAll();
    }

    @Override
    public Optional<Categorie> getCategorieById(Long categorieId) {
        return categorieRepository.findById(categorieId);
    }

    @Override
    public Categorie saveCategorie(Categorie categorie) {
        return categorieRepository.save(categorie);
    }

    @Override
    public void deleteCategorie(Long categorieId) {
        categorieRepository.deleteById(categorieId);
    }
}
