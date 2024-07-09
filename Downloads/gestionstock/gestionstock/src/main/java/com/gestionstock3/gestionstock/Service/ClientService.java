package com.gestionstock3.gestionstock.Service;
import com.gestionstock3.gestionstock.Modele.Client;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    List<Client> getAllClients();
    Optional<Client> getClientById(Long clientId);
    Client saveClient(Client client);
    void deleteClient(Long clientId);
}
