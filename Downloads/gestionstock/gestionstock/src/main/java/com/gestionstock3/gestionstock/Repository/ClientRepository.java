package com.gestionstock3.gestionstock.Repository;
import com.gestionstock3.gestionstock.Modele.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}
