
const QRCode = require('qrcode');
const jwt = require("jsonwebtoken");


exports.getQrCode = async (req, res, next) => {
    try {


        const token = jwt.sign(
            { purpose: "enrollment" }, 
            process.env.JWT_SECRET, 
            { expiresIn: "5m" } // valable 5 minutes
        );
        const qr_data = {
            server_url: process.env.SERVER_URL,
            enrollment_token: token,
            api_endpoint: "/api/devices/enroll"
        };
        const qr_code = await QRCode.toDataURL(JSON.stringify(qr_data));
    
        res.status(200).json({
            answer: "1",
            comment: "QR code généré avec succès",
            result: qr_code
        });
    } catch (error) {
        next(error);
    }
};
const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("@prisma/client").PrismaClient;

const router = express.Router();
const prismaClient = new prisma();



module.exports = router;

