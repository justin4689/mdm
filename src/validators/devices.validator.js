const Joi = require('joi');


exports.enrollSchema = Joi.object({
    device_id: Joi.string().required().messages({
        'any.required': 'Le device_id est obligatoire',
        'string.base': 'Le device_id doit être une chaîne de caractères'
    }),
    serial_number: Joi.string().messages({
        'any.required': 'Le serial_number est obligatoire',
        'string.base': 'Le serial_number doit être une chaîne de caractères'
    }),
    model: Joi.string().messages({
        'any.required': 'Le model est obligatoire',
        'string.base': 'Le model doit être une chaîne de caractères'
    }),
    brand: Joi.string().messages({
        'any.required': 'Le brand est obligatoire',
        'string.base': 'Le brand doit être une chaîne de caractères'
    }),
    os_version: Joi.string().messages({
        'any.required': 'Le os_version est obligatoire',
        'string.base': 'Le os_version doit être une chaîne de caractères'
    }),
    battery_level: Joi.number().messages({
        'any.required': 'Le battery_level est obligatoire',
        'number.base': 'Le battery_level doit être un nombre'
    }),
    network_status: Joi.string().messages({
        'any.required': 'Le network_status est obligatoire',
        'string.base': 'Le network_status doit être une chaîne de caractères'
    }),
    status: Joi.string().messages({
        'any.required': 'Le status est obligatoire',
        'string.base': 'Le status doit être une chaîne de caractères'
    }),
    enrollment_token: Joi.string().required().messages({
        'any.required': 'Le enrollment_token est obligatoire',
        'string.base': 'Le enrollment_token doit être une chaîne de caractères'
    })
})



exports.groupSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Le nom est obligatoire',
        'string.base': 'Le nom doit être une chaîne de caractères'
    }),
    description: Joi.string().messages({
        'string.base': 'La description doit être une chaîne de caractères'
    })
})