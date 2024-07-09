package com.gestionstock3.gestionstock.Service;
import com.gestionstock3.gestionstock.Modele.Categorie;

import java.util.List;
import java.util.Optional;

public interface CategorieService {
    List<Categorie> getAllCategories();
    Optional<Categorie> getCategorieById(Long categorieId);
    Categorie saveCategorie(Categorie categorie);
    void deleteCategorie(Long categorieId);
}
