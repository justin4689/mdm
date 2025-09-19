const Joi = require('joi');

// Schéma de validation pour l'inscription
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Le nom d\'utilisateur doit être une chaîne de caractères',
      'string.alphanum': 'Le nom d\'utilisateur ne doit contenir que des caractères alphanumériques',
      'string.min': 'Le nom d\'utilisateur doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom d\'utilisateur ne doit pas dépasser {#limit} caractères',
      'any.required': 'Le nom d\'utilisateur est obligatoire'
    }),
  
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
    .required()
    .messages({
      'string.email': 'Veuillez fournir une adresse email valide',
      'any.required': 'L\'email est obligatoire'
    }),
    
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$)'))
    .required()
    .messages({
      'string.pattern.base': 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
      'any.required': 'Le mot de passe est obligatoire'
    }),
    
  role: Joi.string()
    .valid('admin', 'user')
    .default('user')
    .messages({
      'any.only': 'Le rôle doit être soit \'admin\' soit \'user\''
    })
});

// Schéma de validation pour la connexion
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Veuillez fournir une adresse email valide',
      'any.required': 'L\'email est obligatoire'
    }),
    
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Le mot de passe est obligatoire'
    })
});


module.exports = {
  registerSchema,
  loginSchema,
};
