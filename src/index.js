const express = require('express');
const { connectDB} = require('./config/db');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const { notFound, errorHandler } = require('./midlwre/error_midlwre');
const authRoutes = require('./routes/auth.routes');
const { logAction } = require('./midlwre/logger.middleware');
// Middleware pour parser le JSON
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());  


// Connexion à la base de données
connectDB();


// Routes 
app.use('/api/auth', authRoutes); 



// Pour les routes non trouvées
app.use(notFound);

// Pour la gestion des erreurs
app.use(errorHandler);










app.get('/', (req, res) => {
  res.send('Hello World!');
});






















// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});