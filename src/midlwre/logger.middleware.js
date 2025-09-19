// logger.middleware.js
const LoggerService = require('../services/logger.service');

function logAction(eventType, messageFn) {
  return async (req, res, next) => {
    try {
      // Exécuter l'action d'abord
      await next();
      
      // Journaliser après l'action
      if (res.statusCode < 400) { // Ne journaliser que les succès
        const adminId = req.user?.id;
        const message = typeof messageFn === 'function' ? 
          messageFn(req, res) : messageFn;
        
        await LoggerService.logAdminAction(adminId, eventType, message);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { logAction };