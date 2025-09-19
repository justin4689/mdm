// Middleware pour gérer les routes non trouvées (404)
const notFound = (req, res, next) => {
    res.status(404).json({
        answer: "0",
        comment: "Route introuvable"
      });
  };
  
  // Middleware d'erreur global - Ne gère que les erreurs 500
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
      answer: "0",
      comment: "Une erreur serveur est survenue",
      error: process.env.NODE_ENV === 'production' ? '🥞' : err.message
    });
  };
  
  module.exports = { notFound, errorHandler };