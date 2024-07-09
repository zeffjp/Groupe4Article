package com.gestionstock3.gestionstock.Repository;

import com.gestionstock3.gestionstock.Modele.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
}
