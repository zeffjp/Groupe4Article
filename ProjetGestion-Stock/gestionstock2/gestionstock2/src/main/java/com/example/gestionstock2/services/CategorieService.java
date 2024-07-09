package com.example.gestionstock2.services;

import com.example.gestionstock2.modele.Categorie;

import java.util.List;

public interface CategorieService {
    List<Categorie> getAllCategories();
    Categorie getCategorieById(int id);
    Categorie createCategorie(Categorie categorie);
    Categorie updateCategorie(int id, Categorie categorie);
    void deleteCategorie(int id);
}
