
// Middleware pour gérer les routes non trouvées (404)
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};




const JWT_SECRET = process.env.JWT_SECRET 
// Middleware d'authentification
exports.authsMidlwre = (req, res, next) => {
  const token = req.cookies.token; // récupération du token

  if (!token) {
    return res.status(401).json({
      answer: "0",
      comment: 'Token d\'authentification manquant'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        answer: "0",
        comment: 'Token invalide ou expiré'
      });
    }
    
    req.user = user;
    next();
  });
};

