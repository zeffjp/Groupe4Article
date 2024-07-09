CREATE TABLE Article (
                         article_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         article_nom VARCHAR(255) NOT NULL,
                         article_description TEXT,
                         article_prix DOUBLE NOT NULL,
                         article_quantite INT NOT NULL,
                         categorie_id BIGINT,
                         CONSTRAINT fk_article_categorie FOREIGN KEY (categorie_id) REFERENCES Categorie(categorie_id)
);
CREATE TABLE Client (
                          client_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          clientNom VARCHAR(255) NOT NULL,
                          clientPrénom VARCHAR(255) NOT NULL,
                          clientEmail VARCHAR(255) NOT NULL,
                          clientTéléphone VARCHAR(255) NOT NULL
  );
CREATE TABLE Categorie (
                           categorie_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           categorieNom VARCHAR(255) NOT NULL,
                           categorieDescription TEXT,
                           CONSTRAINT fk_categorie_article FOREIGN KEY (categorie_id) REFERENCES Article(article_id)
);

CREATE TABLE Commande (
                          commandenumero BIGINT AUTO_INCREMENT PRIMARY KEY,
                          client_id BIGINT,
                          commandedate DATE NOT NULL,
                          article_id BIGINT,
                          commandequantite INT NOT NULL,
                          commandeprixtotal DOUBLE NOT NULL,
                          commandestatut VARCHAR(255) NOT NULL,
                          CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES Client(client_id),
                          CONSTRAINT fk_article FOREIGN KEY (article_id) REFERENCES Article(article_id)
);
CREATE TABLE Vente (
                       vente_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       client_id BIGINT,
                       article_id BIGINT,
                       date DATE NOT NULL,
                       quantiteVendue INT NOT NULL,
                       prixTotal DOUBLE NOT NULL,
                       CONSTRAINT fk_vente_client FOREIGN KEY (client_id) REFERENCES Client(client_id),
                       CONSTRAINT fk_vente_article FOREIGN KEY (article_id) REFERENCES Article(article_id)
);
