// log.controller.js
exports.getLogs = async (req, res, next) => {
    try {
      const { page = 1, limit = 50, adminId, deviceId, eventType } = req.query;
      const skip = (page - 1) * limit;
      
      const where = {};
      if (adminId) where.admin_id = parseInt(adminId);
      if (deviceId) where.device_id = parseInt(deviceId);
      if (eventType) where.event_type = eventType;
      
      const logs = await prisma.log.findMany({
        where,
        include: {
          admin: { select: { email: true } },
          device: { select: { device_id: true } }
        },
        orderBy: { created_at: 'desc' },
        skip: parseInt(skip),
        take: parseInt(limit)
      });
      
      res.json({ answer: "1", comment: "Logs récupérés avec succès", result: logs });
    } catch (error) {
      next(error);
    }
  };