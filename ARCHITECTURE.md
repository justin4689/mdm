# Architecture du Projet MDM Android

## Aperçu du Projet
Ce document décrit l'architecture du système de gestion d'appareils mobiles (MDM) pour Android, développé avec Node.js et Express.

## Structure des Répertoires
```
projet-mdm-android/
├── .env                    # Variables d'environnement
├── package.json            # Dépendances et scripts
├── src/
│   ├── config/            # Configuration de l'application
│   │   └── db.js          # Configuration de la base de données
│   ├── controllers/       # Contrôleurs de l'API
│   ├── midlwre/           # Middlewares personnalisés
│   ├── routes/            # Définition des routes API
│   ├── schema/            # Schémas de base de données (Prisma)
│   ├── utils/             # Utilitaires et helpers
│   └── index.js           # Point d'entrée de l'application
└── node_modules/          # Dépendances du projet
```

## Technologies Utilisées

### Backend
- **Node.js**: Environnement d'exécution JavaScript
- **Express.js**: Framework web pour Node.js
- **Prisma**: ORM pour la gestion de la base de données
- **JWT**: Authentification par token
- **Bcrypt**: Hashage des mots de passe

### Base de Données
- À définir (configuration présente mais schéma non spécifié)

## Configuration
Le fichier `.env` contient les variables d'environnement nécessaires :
- `PORT`: Port d'écoute du serveur (par défaut: 3000)
- Autres variables à définir (base de données, clés secrètes, etc.)

## Points d'API (Endpoints)
À définir selon les besoins du projet.

## Sécurité
- Authentification par JWT
- Hashage des mots de passe avec Bcrypt
- Gestion des CORS
- Variables sensibles stockées dans `.env`

## Développement
### Prérequis
- Node.js (version recommandée: LTS)
- npm ou yarn
- Base de données (à configurer)

### Installation
1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Configurer le fichier `.env`
4. Lancer le serveur : `npm run dev` (développement) ou `npm start` (production)

## Déploiement
À définir selon l'environnement de production cible.

## Améliorations Futures
- Implémentation des contrôleurs
- Définition des modèles de données
- Mise en place des tests unitaires
- Documentation complète de l'API (Swagger/OpenAPI)
- Sécurisation avancée (rate limiting, validation des entrées, etc.)
