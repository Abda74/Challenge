Challenge Technique : Développement d'un Blog
Description du projet

Ce projet est une application web permettant de gérer un blog. Il comprend un système d'authentification, la gestion des articles (création, modification, suppression), ainsi qu'un système de likes et de vues. L'interface utilisateur respecte la maquette fournie sur Figma.
Technologies utilisées
Frontend :

    React.js (Vite, version 18)
    React Router
    Tailwind CSS
    Mantine UI
    TipTap pour l'édition de texte riche
    Axios pour les requêtes HTTP

Backend :

    Node.js (version 22) avec Express
    MongoDB avec Mongoose
    JSON Web Token (JWT) pour l'authentification
    BcryptJS pour le hash des mots de passe
    Dotenv pour la gestion des variables d'environnement
    CORS pour la gestion des autorisations cross-origin

Fonctionnalités
Pages principales :

    Accueil : Affichage des articles avec titre, image, extrait
    Détails d'un article : Contenu complet, likes et vues
    Page d'édition : Création, modification, suppression d'articles (protégée par authentification)

Système d'authentification :

    Page de connexion
    Bouton de déconnexion
    JWT pour la gestion des sessions

Fonctionnalités bonus :

    Design responsive
    Animations CSS et Mantine UI

Installation et exécution
Prérequis

    Node.js (version 22) et npm
    MongoDB (local ou Atlas)

Configuration du backend

    Cloner le projet :

git clone https://github.com/votre-repo/blog-app.git
cd blog-app/backend

Installer les dépendances :

npm install

Créer un fichier .env et ajouter :

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Lancer le serveur :

    npm start

Configuration du frontend

    Aller dans le dossier frontend :

cd ../frontend

Installer les dépendances :

npm install

Lancer le projet :

    npm run dev

Utilisation

    Accéder à http://localhost:3000 pour voir l'application.
    Accéder à http://localhost:5000/api/articles pour voir les articles.

Déploiement

Le projet peut être déployé sur :

    Frontend : Vercel ou Netlify
    Backend : Vercel, Render, ou Railway
    Base de données : MongoDB Atlas

Auteur

    Nom : NIGNAN Amed Abdala
    Email : infosrecrutementbf@gmail.com

Liens utiles

    Dépôt GitHub
    Lien de démo (si disponible)

Licence

Ce projet est sous licence MIT.