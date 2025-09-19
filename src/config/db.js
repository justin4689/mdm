const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['info', 'warn', 'error']
    });
  }
  prisma = global.prisma;
}

async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Connecté à la base de données');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:');
    console.error(error.message);
    process.exit(1);
  }
}

// Nettoyage à l'arrêt
process.on('SIGINT', async () => {
  if (prisma) {
    await prisma.$disconnect();
    console.log('Déconnecté de la base de données');
  }
  process.exit(0);
});

module.exports = { prisma, connectDB };