const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LoggerService {
  static async logAdminAction(adminId, eventType, message) {
    try {
      await prisma.log.create({
        data: {
          admin_id: adminId,
          event_type: eventType,
          message: message
        }
      });
    } catch (error) {
      console.error('Erreur lors de la journalisation:', error);
    }
  }

  static async logDeviceAction(deviceId, eventType, message, adminId = null) {
    try {
      await prisma.log.create({
        data: {
          device_id: deviceId,
          admin_id: adminId,
          event_type: eventType,
          message: message
        }
      });
    } catch (error) {
      console.error('Erreur lors de la journalisation:', error);
    }
  }
}

module.exports = LoggerService;