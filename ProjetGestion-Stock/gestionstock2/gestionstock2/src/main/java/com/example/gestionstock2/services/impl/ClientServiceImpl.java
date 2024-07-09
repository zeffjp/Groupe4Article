package com.example.gestionstock2.services.impl;

import com.example.gestionstock2.exceptions.NotFoundException;
import com.example.gestionstock2.modele.Client;
import com.example.gestionstock2.repositories.ClientRepository;
import com.example.gestionstock2.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client getClientById(int id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Client non trouvé"));
    }

    @Override
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(int id, Client client) {
        if (!clientRepository.existsById(id)) {
            throw new NotFoundException("Client non trouvé");
        }
        client.setIdClient(id);
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(int id) {
        clientRepository.deleteById(id);
    }
}
