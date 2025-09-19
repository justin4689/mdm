const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const LoggerService = require('../services/logger.service');


const JWT_SECRET = process.env.JWT_SECRET ;

// Inscription d'un nouvel administrateur
exports.register = async (req, res, next) => {
  try {
    // Validation des données avec Joi
    const { error, value } = registerSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        answer: "0",
        comment: error.details.map(detail => ({
          message: detail.message
        }))
      });
    }

    // Vérifier si l'administrateur existe déjà
    const adminExists = await prisma.admin.findUnique({
      where: { email: value.email }
    });

    if (adminExists) {
      return res.status(400).json({
        answer: "0",
        comment: 'Un administrateur avec cet email existe déjà'
      });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(value.password, 10);

    // Créer l'administrateur
    const admin = await prisma.admin.create({
      data: {
        username: value.username,
        email: value.email,
        password_hash: hashedPassword,
        role: value.role || 'admin'  
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        created_at: true
      }
    });

    res.status(201).json({
        answer: "1",
        comment: "Inscription réussie"
    
      }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    next(error);
  }
};

// Connexion d'un administrateur
exports.login = async (req, res, next) => {
  try {
    // Validation des données avec Joi
    const { error, value } = loginSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        answer: "0",
        comment: 'Données de validation invalides',
        errors: error.details.map(detail => ({
          message: detail.message
        }))
      });
    }

    // Vérifier si l'administrateur existe
    const admin = await prisma.admin.findUnique({
      where: { email: value.email }
    });

    if (!admin) {
      return res.status(401).json({
        answer: "0",
        comment: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(value.password, admin.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        answer: "0",
        comment: 'Email ou mot de passe incorrect'
      });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: admin.id, role: admin.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Exclure le mot de passe de la réponse
    const { password_hash, ...adminData } = admin;
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax"
      };
      
      res.cookie("token", token, cookieOptions);
      await LoggerService.logAdminAction(
        admin.id,
        'login_admin',
        `Connexion réussie pour l'admin ${admin.email} depuis ${req.ip}`
      );

    res.status(200).json({
      answer: "1",
      comment: "Connexion réussie",
      result: adminData,
    });
  } catch (error) {

    // En cas d'échec de connexion :
    await LoggerService.logAdminAction(
    null,
    'login_failed',
    `Échec de connexion pour l'email ${value.email} depuis ${req.ip}`
  );    
    next(error);
  }
};
