const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const app = express();

// Config CORS (adapter origin selon ton frontend)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Config base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'passer', // adapte selon ta config
  database: 'gestion_stock_projet',
};

// Fonction utilitaire pour exécuter les requêtes SQL
async function query(sql, params) {
  const conn = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await conn.execute(sql, params);
    return rows;
  } finally {
    await conn.end();
  }
}

// Utilitaire pour formater une date au format MySQL 'YYYY-MM-DD'
function formatDateToSQL(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d)) return null;
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ===================== ROUTES ======================

// --- CLIENT ---
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await query('SELECT * FROM Client');
    res.json(clients);
  } catch (error) {
    console.error('Erreur get clients:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des clients.' });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    const { client_nom, client_prenom, client_email, client_tel, client_adresse } = req.body;
    if (!client_nom || !client_prenom) {
      return res.status(400).json({ error: 'Nom et prénom du client sont requis.' });
    }
    const client_id = crypto.randomUUID();
    await query(
      'INSERT INTO Client (client_id, client_nom, client_prenom, client_email, client_tel, client_adresse) VALUES (?, ?, ?, ?, ?, ?)',
      [client_id, client_nom, client_prenom, client_email || null, client_tel || null, client_adresse || null]
    );
    res.status(201).json({ client_id, client_nom, client_prenom, client_email, client_tel, client_adresse });
  } catch (error) {
    console.error('Erreur création client:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du client.' });
  }
});

app.put('/api/clients/:id', async (req, res) => {
  try {
    const client_id = req.params.id;
    const { client_nom, client_prenom, client_email, client_tel, client_adresse } = req.body;
    if (!client_nom || !client_prenom) {
      return res.status(400).json({ error: 'Nom et prénom du client sont requis.' });
    }
    await query(
      'UPDATE Client SET client_nom=?, client_prenom=?, client_email=?, client_tel=?, client_adresse=? WHERE client_id=?',
      [client_nom, client_prenom, client_email || null, client_tel || null, client_adresse || null, client_id]
    );
    res.json({ client_id, client_nom, client_prenom, client_email, client_tel, client_adresse });
  } catch (error) {
    console.error('Erreur mise à jour client:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du client.' });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    await query('DELETE FROM Client WHERE client_id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erreur suppression client:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du client.' });
  }
});

// --- CATEGORIE ---
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await query('SELECT * FROM Categorie');
    res.json(categories);
  } catch (error) {
    console.error('Erreur get categories:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des catégories.' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { categorie_nom, categorie_description } = req.body;
    if (!categorie_nom) {
      return res.status(400).json({ error: 'Nom de la catégorie requis.' });
    }
    const categorie_id = crypto.randomUUID();
    await query(
      'INSERT INTO Categorie (categorie_id, categorie_nom, categorie_description) VALUES (?, ?, ?)',
      [categorie_id, categorie_nom, categorie_description || null]
    );
    res.status(201).json({ categorie_id, categorie_nom, categorie_description });
  } catch (error) {
    console.error('Erreur création categorie:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la catégorie.' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const categorie_id = req.params.id;
    const { categorie_nom, categorie_description } = req.body;
    if (!categorie_nom) {
      return res.status(400).json({ error: 'Nom de la catégorie requis.' });
    }
    await query(
      'UPDATE Categorie SET categorie_nom=?, categorie_description=? WHERE categorie_id=?',
      [categorie_nom, categorie_description || null, categorie_id]
    );
    res.json({ categorie_id, categorie_nom, categorie_description });
  } catch (error) {
    console.error('Erreur mise à jour categorie:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la catégorie.' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await query('DELETE FROM Categorie WHERE categorie_id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erreur suppression categorie:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de la catégorie.' });
  }
});

// --- ARTICLE ---
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await query(`
      SELECT a.*, c.categorie_nom 
      FROM Article a
      LEFT JOIN Categorie c ON a.categorie_id = c.categorie_id
    `);
    res.json(articles);
  } catch (error) {
    console.error('Erreur get articles:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des articles.' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const {
      article_nom,
      article_description,
      article_prix,
      article_prixAchat,
      article_quantiteEnStock,
      categorie_nom,
    } = req.body;
    if (!article_nom || !article_prix || !article_prixAchat) {
      return res.status(400).json({ error: 'Nom, prix de vente et prix d\'achat requis.' });
    }
    const categorieRows = await query('SELECT categorie_id FROM Categorie WHERE categorie_nom = ?', [categorie_nom]);
    if (categorieRows.length === 0) return res.status(400).json({ error: 'Catégorie inconnue' });
    const categorie_id = categorieRows[0].categorie_id;

    const article_id = crypto.randomUUID();
    await query(
      `INSERT INTO Article 
       (article_id, article_nom, article_description, article_prix, article_prixAchat, article_quantiteEnStock, categorie_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [article_id, article_nom, article_description || null, article_prix, article_prixAchat, article_quantiteEnStock || 0, categorie_id]
    );
    res.status(201).json({ article_id, article_nom, article_description, article_prix, article_prixAchat, article_quantiteEnStock, categorie_nom });
  } catch (error) {
    console.error('Erreur création article:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'article.' });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const article_id = req.params.id;
    const {
      article_nom,
      article_description,
      article_prix,
      article_prixAchat,
      article_quantiteEnStock,
      categorie_nom,
    } = req.body;
    if (!article_nom || !article_prix || !article_prixAchat) {
      return res.status(400).json({ error: 'Nom, prix de vente et prix d\'achat requis.' });
    }
    const categorieRows = await query('SELECT categorie_id FROM Categorie WHERE categorie_nom = ?', [categorie_nom]);
    if (categorieRows.length === 0) return res.status(400).json({ error: 'Catégorie inconnue' });
    const categorie_id = categorieRows[0].categorie_id;

    await query(
      `UPDATE Article SET 
        article_nom=?, 
        article_description=?, 
        article_prix=?, 
        article_prixAchat=?,
        article_quantiteEnStock=?, 
        categorie_id=? 
       WHERE article_id=?`,
      [article_nom, article_description || null, article_prix, article_prixAchat, article_quantiteEnStock || 0, categorie_id, article_id]
    );
    res.json({ article_id, article_nom, article_description, article_prix, article_prixAchat, article_quantiteEnStock, categorie_nom });
  } catch (error) {
    console.error('Erreur mise à jour article:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'article.' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    await query('DELETE FROM Article WHERE article_id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erreur suppression article:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'article.' });
  }
});

// --- COMMANDE ---
app.get('/api/commandes', async (req, res) => {
  try {
    const commandes = await query(`
      SELECT cm.*, c.client_nom, a.article_nom
      FROM Commande cm
      LEFT JOIN Client c ON cm.client_id = c.client_id
      LEFT JOIN Article a ON cm.article_id = a.article_id
      ORDER BY cm.commande_dateCommande DESC
      LIMIT 100
    `);
    res.json(commandes);
  } catch (error) {
    console.error('Erreur get commandes:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commandes.' });
  }
});

app.post('/api/commandes', async (req, res) => {
  try {
    const {
      commande_dateCommande,
      commande_quantiteCommandee,
      commande_statut,
      client_nom,
      article_nom,
    } = req.body;

    // Formatage date
    const dateSQL = formatDateToSQL(commande_dateCommande);
    if (!dateSQL) return res.status(400).json({ error: 'Date de commande invalide ou manquante.' });

    // Récupérer client_id
    const clientRows = await query('SELECT client_id FROM Client WHERE client_nom = ?', [client_nom]);
    if (clientRows.length === 0) return res.status(400).json({ error: 'Client inconnu' });
    const client_id = clientRows[0].client_id;

    // Récupérer article_id, prix, stock
    const articleRows = await query('SELECT article_id, article_prix, article_quantiteEnStock FROM Article WHERE article_nom = ?', [article_nom]);
    if (articleRows.length === 0) return res.status(400).json({ error: 'Article inconnu' });
    const article = articleRows[0];

    if (commande_quantiteCommandee > article.article_quantiteEnStock) {
      return res.status(400).json({ error: 'Quantité commandée supérieure au stock disponible' });
    }

    const commande_prixUnitaire = article.article_prix * commande_quantiteCommandee;
    const commande_id = crypto.randomUUID();

    // Insérer la commande
    await query(
      `INSERT INTO Commande
       (commande_id, commande_dateCommande, commande_quantiteCommandee, commande_prixUnitaire, commande_statut, client_id, article_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [commande_id, dateSQL, commande_quantiteCommandee, commande_prixUnitaire, commande_statut, client_id, article.article_id]
    );

    // Mise à jour stock
    if (commande_statut === 'Livrée') {
      await query(
        `UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock - ? WHERE article_id = ?`,
        [commande_quantiteCommandee, article.article_id]
      );
    }

    res.status(201).json({
      commande_id,
      commande_dateCommande: dateSQL,
      commande_quantiteCommandee,
      commande_prixUnitaire,
      commande_statut,
      client_nom,
      article_nom,
    });
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la commande.' });
  }
});

app.put('/api/commandes/:id', async (req, res) => {
  try {
    const commande_id = req.params.id;
    const {
      commande_dateCommande,
      commande_quantiteCommandee,
      commande_statut,
      client_nom,
      article_nom,
    } = req.body;

    // Formatage date
    const dateSQL = formatDateToSQL(commande_dateCommande);
    if (!dateSQL) return res.status(400).json({ error: 'Date de commande invalide ou manquante.' });

    // Récupérer client_id
    const clientRows = await query('SELECT client_id FROM Client WHERE client_nom = ?', [client_nom]);
    if (clientRows.length === 0) return res.status(400).json({ error: 'Client inconnu' });
    const client_id = clientRows[0].client_id;

    // Récupérer article_id, prix, stock
    const articleRows = await query('SELECT article_id, article_prix, article_quantiteEnStock FROM Article WHERE article_nom = ?', [article_nom]);
    if (articleRows.length === 0) return res.status(400).json({ error: 'Article inconnu' });
    const article = articleRows[0];

    // Récupérer commande actuelle
    const oldCommandeRows = await query('SELECT commande_quantiteCommandee, article_id, commande_statut FROM Commande WHERE commande_id = ?', [commande_id]);
    if (oldCommandeRows.length === 0) return res.status(404).json({ error: 'Commande non trouvée' });
    const oldCommande = oldCommandeRows[0];

    const ancienneQuantite = oldCommande.commande_quantiteCommandee;
    const ancienArticleId = oldCommande.article_id;
    const ancienStatut = oldCommande.commande_statut;

    const nouvelleQuantite = commande_quantiteCommandee;
    const nouveauArticleId = article.article_id;
    const nouveauStatut = commande_statut;

    // Calcul nouveau prix total
    const commande_prixUnitaire = article.article_prix * nouvelleQuantite;

    // Gestion restitution / retrait stock selon changements
    // 1) Si article changé
    if (ancienArticleId !== nouveauArticleId) {
      // Restituer ancien stock si statut ancien "Livrée"
      if (ancienStatut === 'Livrée') {
        await query(
          'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock + ? WHERE article_id = ?',
          [ancienneQuantite, ancienArticleId]
        );
      }

      // Vérifier stock nouveau article si nouveau statut "Livrée"
      if (nouveauStatut === 'Livrée' && nouvelleQuantite > article.article_quantiteEnStock) {
        return res.status(400).json({ error: 'Quantité commandée supérieure au stock disponible pour le nouvel article' });
      }

      // Retirer nouveau stock si statut "Livrée"
      if (nouveauStatut === 'Livrée') {
        await query(
          'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock - ? WHERE article_id = ?',
          [nouvelleQuantite, nouveauArticleId]
        );
      }
    } else {
      // 2) Même article, gestion selon statut et quantités
      if (ancienStatut === 'Livrée' && nouveauStatut !== 'Livrée') {
        // Passage de "Livrée" à autre => restituer tout
        await query(
          'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock + ? WHERE article_id = ?',
          [ancienneQuantite, ancienArticleId]
        );
      } else if (ancienStatut !== 'Livrée' && nouveauStatut === 'Livrée') {
        // Passage de autre à "Livrée" => retirer stock total nouvelleQuantite
        if (nouvelleQuantite > article.article_quantiteEnStock) {
          return res.status(400).json({ error: 'Quantité commandée supérieure au stock disponible' });
        }
        await query(
          'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock - ? WHERE article_id = ?',
          [nouvelleQuantite, ancienArticleId]
        );
      } else if (ancienStatut === 'Livrée' && nouveauStatut === 'Livrée') {
        // Même statut "Livrée" => ajuster stock selon différence
        const difference = nouvelleQuantite - ancienneQuantite;
        const currentStockRows = await query('SELECT article_quantiteEnStock FROM Article WHERE article_id = ?', [ancienArticleId]);
        const currentStock = currentStockRows[0].article_quantiteEnStock;

        if (difference > 0) {
          if (difference > currentStock) {
            return res.status(400).json({ error: 'Quantité commandée supérieure au stock disponible' });
          }
          await query(
            'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock - ? WHERE article_id = ?',
            [difference, ancienArticleId]
          );
        } else if (difference < 0) {
          await query(
            'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock + ? WHERE article_id = ?',
            [-difference, ancienArticleId]
          );
        }
      }
    }

    // Mise à jour commande dans la base
    await query(
      `UPDATE Commande SET 
        commande_dateCommande=?, 
        commande_quantiteCommandee=?, 
        commande_prixUnitaire=?, 
        commande_statut=?, 
        client_id=?, 
        article_id=?
      WHERE commande_id=?`,
      [dateSQL, nouvelleQuantite, commande_prixUnitaire, nouveauStatut, client_id, nouveauArticleId, commande_id]
    );

    res.json({
      commande_id,
      commande_dateCommande: dateSQL,
      commande_quantiteCommandee: nouvelleQuantite,
      commande_prixUnitaire,
      commande_statut: nouveauStatut,
      client_nom,
      article_nom,
    });
  } catch (error) {
    console.error('Erreur mise à jour commande:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la commande.' });
  }
});

app.delete('/api/commandes/:id', async (req, res) => {
  try {
    const commande_id = req.params.id;

    const commandeRows = await query(
      'SELECT commande_quantiteCommandee, article_id, commande_statut FROM Commande WHERE commande_id = ?',
      [commande_id]
    );
    if (commandeRows.length === 0) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }
    const commande = commandeRows[0];

    // Restituer le stock si statut "Livrée"
    if (commande.commande_statut === 'Livrée') {
      await query(
        'UPDATE Article SET article_quantiteEnStock = article_quantiteEnStock + ? WHERE article_id = ?',
        [commande.commande_quantiteCommandee, commande.article_id]
      );
    }

    await query('DELETE FROM Commande WHERE commande_id = ?', [commande_id]);

    res.sendStatus(204);
  } catch (error) {
    console.error('Erreur suppression commande:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de la commande.' });
  }
});

// --- VENTE ---
app.get('/api/ventes', async (req, res) => {
  try {
    const ventes = await query(`
      SELECT 
        cm.commande_id AS vente_id,
        cl.client_nom,
        a.article_nom,
        cm.commande_dateCommande AS vente_dateVente,
        cm.commande_quantiteCommandee AS vente_quantiteVendue,
        a.article_prix AS vente_prixUnitaire
      FROM Commande cm
      JOIN Client cl ON cm.client_id = cl.client_id
      JOIN Article a ON cm.article_id = a.article_id
      WHERE cm.commande_statut = 'Livrée'
      ORDER BY cm.commande_dateCommande DESC
      LIMIT 100
    `);
    res.json(ventes);
  } catch (error) {
    console.error('Erreur get ventes:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des ventes.' });
  }
});

app.post('/api/ventes', async (req, res) => {
  try {
    const {
      vente_dateVente,
      vente_prixUnitaire,
      vente_quantiteVendue,
      client_nom,
      article_nom,
    } = req.body;

    // Formatage date
    const dateSQL = formatDateToSQL(vente_dateVente);
    if (!dateSQL) return res.status(400).json({ error: 'Date de vente invalide ou manquante.' });

    // Récupérer client_id
    const clientRows = await query('SELECT client_id FROM Client WHERE client_nom = ?', [client_nom]);
    if (clientRows.length === 0) return res.status(400).json({ error: 'Client inconnu' });
    const client_id = clientRows[0].client_id;

    // Récupérer article_id
    const articleRows = await query('SELECT article_id FROM Article WHERE article_nom = ?', [article_nom]);
    if (articleRows.length === 0) return res.status(400).json({ error: 'Article inconnu' });
    const article_id = articleRows[0].article_id;

    const vente_id = crypto.randomUUID();

    // Insérer la vente
    await query(
      `INSERT INTO Vente 
       (vente_id, vente_dateVente, vente_prixUnitaire, vente_quantiteVendue, client_id, article_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [vente_id, dateSQL, vente_prixUnitaire, vente_quantiteVendue, client_id, article_id]
    );

    res.status(201).json({
      vente_id,
      vente_dateVente: dateSQL,
      vente_prixUnitaire,
      vente_quantiteVendue,
      client_nom,
      article_nom,
    });
  } catch (error) {
    console.error('Erreur création vente:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de la vente.' });
  }
});

app.put('/api/ventes/:id', async (req, res) => {
  try {
    const vente_id = req.params.id;
    const {
      vente_dateVente,
      vente_prixUnitaire,
      vente_quantiteVendue,
      client_nom,
      article_nom,
    } = req.body;

    // Formatage date
    const dateSQL = formatDateToSQL(vente_dateVente);
    if (!dateSQL) return res.status(400).json({ error: 'Date de vente invalide ou manquante.' });

    // Récupérer client_id
    const clientRows = await query('SELECT client_id FROM Client WHERE client_nom = ?', [client_nom]);
    if (clientRows.length === 0) return res.status(400).json({ error: 'Client inconnu' });
    const client_id = clientRows[0].client_id;

    // Récupérer article_id
    const articleRows = await query('SELECT article_id FROM Article WHERE article_nom = ?', [article_nom]);
    if (articleRows.length === 0) return res.status(400).json({ error: 'Article inconnu' });
    const article_id = articleRows[0].article_id;

    await query(
      `UPDATE Vente SET
        vente_dateVente = ?,
        vente_prixUnitaire = ?,
        vente_quantiteVendue = ?,
        client_id = ?,
        article_id = ?
      WHERE vente_id = ?`,
      [dateSQL, vente_prixUnitaire, vente_quantiteVendue, client_id, article_id, vente_id]
    );

    res.json({
      vente_id,
      vente_dateVente: dateSQL,
      vente_prixUnitaire,
      vente_quantiteVendue,
      client_nom,
      article_nom,
    });
  } catch (error) {
    console.error('Erreur mise à jour vente:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la vente.' });
  }
});

app.delete('/api/ventes/:id', async (req, res) => {
  try {
    await query('DELETE FROM Vente WHERE vente_id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erreur suppression vente:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de la vente.' });
  }
});

// --- STATISTIQUES VENTES ---
app.get('/api/ventes/recette-total', async (req, res) => {
  try {
    const result = await query(`
      SELECT COALESCE(SUM(commande_prixUnitaire), 0) AS recette_totale
      FROM Commande
      WHERE commande_statut = 'Livrée'
    `);
    res.json({ recette_totale: result[0].recette_totale });
  } catch (error) {
    console.error('Erreur recette totale:', error);
    res.status(500).json({ error: 'Erreur serveur lors du calcul de la recette totale.' });
  }
});

app.get('/api/ventes/recettes', async (req, res) => {
  try {
    const { periode } = req.query;
    let groupByClause = '';
    let selectClause = '';

    switch (periode) {
      case 'day':
        groupByClause = 'DATE(commande_dateCommande)';
        selectClause = 'DATE(commande_dateCommande) AS periode';
        break;
      case 'week':
        groupByClause = 'YEAR(commande_dateCommande), WEEK(commande_dateCommande)';
        selectClause = 'YEAR(commande_dateCommande) AS annee, WEEK(commande_dateCommande) AS semaine';
        break;
      case 'month':
      default:
        groupByClause = 'YEAR(commande_dateCommande), MONTH(commande_dateCommande)';
        selectClause = 'YEAR(commande_dateCommande) AS annee, MONTH(commande_dateCommande) AS mois';
        break;
        case 'year':
  groupByClause = 'YEAR(commande_dateCommande)';
  selectClause  = 'YEAR(commande_dateCommande) AS annee';
  break;

    }

    const result = await query(`
      SELECT ${selectClause}, COALESCE(SUM(commande_prixUnitaire), 0) AS recette
      FROM Commande
      WHERE commande_statut = 'Livrée'
      GROUP BY ${groupByClause}
      ORDER BY ${groupByClause} DESC
      LIMIT 50
    `);

    res.json(result);
  } catch (error) {
    console.error('Erreur recettes par période:', error);
    res.status(500).json({ error: 'Erreur serveur lors du calcul des recettes par période.' });
  }
});

app.get('/api/ventes/benefices', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        COALESCE(SUM(cm.commande_prixUnitaire), 0) AS recette_totale,
        COALESCE(SUM(cm.commande_quantiteCommandee * a.article_prixAchat), 0) AS cout_total,
        COALESCE(SUM(cm.commande_prixUnitaire) - SUM(cm.commande_quantiteCommandee * a.article_prixAchat), 0) AS benefice
      FROM Commande cm
      JOIN Article a ON cm.article_id = a.article_id
      WHERE cm.commande_statut = 'Livrée'
    `);
    res.json({
      recette_totale: result[0].recette_totale,
      cout_total: result[0].cout_total,
      benefice: result[0].benefice,
    });
  } catch (error) {
    console.error('Erreur calcul bénéfices:', error);
    res.status(500).json({ error: 'Erreur serveur lors du calcul des bénéfices.' });
  }
});

// --- USER ---
app.get('/api/users', async (req, res) => {
  try {
    const users = await query('SELECT * FROM User');
    res.json(users);
  } catch (error) {
    console.error('Erreur get users:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs.' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const {
      user_nom,
      user_prenom,
      user_email,
      user_mdp,
      user_adresse,
      user_contact,
      user_tel,
      user_role,
    } = req.body;
    if (!user_nom || !user_prenom || !user_email || !user_mdp) {
      return res.status(400).json({ error: 'Nom, prénom, email et mot de passe requis.' });
    }
    const user_id = crypto.randomUUID();
    // TODO : hacher le mot de passe en prod
    await query(
      `INSERT INTO User 
       (user_id, user_nom, user_prenom, user_email, user_mdp, user_adresse, user_contact, user_tel, user_role) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, user_nom, user_prenom, user_email, user_mdp, user_adresse || null, user_contact || null, user_tel || null, user_role || 'utilisateur']
    );
    res.status(201).json({ user_id, user_nom, user_prenom, user_email, user_mdp, user_adresse, user_contact, user_tel, user_role });
  } catch (error) {
    console.error('Erreur création user:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur.' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const user_id = req.params.id;
    const {
      user_nom,
      user_prenom,
      user_email,
      user_mdp,
      user_adresse,
      user_contact,
      user_tel,
      user_role,
    } = req.body;
    if (!user_nom || !user_prenom || !user_email) {
      return res.status(400).json({ error: 'Nom, prénom et email requis.' });
    }
    await query(
      `UPDATE User SET 
        user_nom = ?, 
        user_prenom = ?, 
        user_email = ?, 
        user_mdp = ?, 
        user_adresse = ?, 
        user_contact = ?, 
        user_tel = ?,
        user_role = ?
      WHERE user_id = ?`,
      [user_nom, user_prenom, user_email, user_mdp || null, user_adresse || null, user_contact || null, user_tel || null, user_role || 'utilisateur', user_id]
    );
    res.json({ user_id, user_nom, user_prenom, user_email, user_mdp, user_adresse, user_contact, user_tel, user_role });
  } catch (error) {
    console.error('Erreur mise à jour user:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur.' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await query('DELETE FROM User WHERE user_id=?', [req.params.id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Erreur suppression user:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur.' });
  }
});

// --- LOGIN ---
app.post('/api/login', async (req, res) => {
  const { user_email, user_mdp } = req.body;
  if (!user_email || !user_mdp) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  try {
    const users = await query(
      'SELECT * FROM User WHERE user_email = ? AND user_mdp = ?',
      [user_email, user_mdp]
    );
    if (users.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    const user = users[0];
    res.json({
      user_id: user.user_id,
      user_nom: user.user_nom,
      user_prenom: user.user_prenom,
      user_email: user.user_email,
      user_role: user.user_role || 'utilisateur',
      user_adresse: user.user_adresse,
      user_contact: user.user_contact,
      user_tel: user.user_tel,
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la connexion.' });
  }
});

// =======================

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}/api/`);
});
