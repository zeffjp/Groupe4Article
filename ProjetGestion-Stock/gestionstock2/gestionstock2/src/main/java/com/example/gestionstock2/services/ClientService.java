package com.example.gestionstock2.services;

import com.example.gestionstock2.modele.Client;

import java.util.List;

public interface ClientService {
    List<Client> getAllClients();
    Client getClientById(int id);
    Client createClient(Client client);
    Client updateClient(int id, Client client);
    void deleteClient(int id);
}
