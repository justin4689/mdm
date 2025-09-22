
const QRCode = require('qrcode');
const jwt = require("jsonwebtoken");
const { groupSchema, enrollSchema } = require('../validators/devices.validator');

// Générer un QR code
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

// Enregistrer un appareil
 exports.enrollDevices  = async (req, res, next) => {


    try {

    //const { device_id, serial_number, model, brand, os_version, battery_level, network_status, status , enrollment_token } = req.body;

        const { error, value } = enrollSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                answer: "0",
                comment: error.details.map(detail => ({
                    message: detail.message
                }))
            });
        }


        const deviceExists = await prisma.device.findUnique({
            where: { device_id: value.device_id }
        });

        if (deviceExists) {
            return res.status(400).json({
                answer: "0",
                comment: 'Un appareil avec ce device_id existe déjà'
            });
        }

        const device = await prisma.device.create({
            data: value
        });

        return res.status(200).json({
            answer: "1",
            comment: "Appareil enregistré avec succès",
            result: device
        });
        
    } catch (error) {

        next(error);

    }
}

// Récupérer tous les appareils
exports.getAllDevices = async (req ,res, next) =>  {
    try {
        const devices = await prisma.device.findMany();
        return res.status(200).json({
            answer: "1",
            comment: "Appareils récupérés avec succès",
            result: devices
        });
    } catch (error) {
        next(error);
    }
}

// Créer un groupe
 exports.createGroup = async (req, res, next) => {
    try {

        const { error, value } = groupSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                answer: "0",
                comment: error.details.map(detail => ({
                    message: detail.message
                }))
            });

        }

        const groupExists = await prisma.group.findUnique({
            where: { name: value.name }
        });

        if (groupExists) {
            return res.status(400).json({
                answer: "0",
                comment: 'Un groupe avec ce nom existe déjà'
            });
        }

        const group = await prisma.group.create({
            data: value
        });

        return res.status(200).json({
            answer: "1",
            comment: "Groupe créé avec succès",
            result: group
        });

    } catch (error) {
        next(error);
    }
}
// Récupérer tous les groupes
exports.allGroup =  async (req, res, next) => {

    try {
        const groups = await prisma.group.findMany();
        return res.status(200).json({
            answer: "1",
            comment: "Groupes récupérés avec succès",
            result: groups
        });
    } catch (error) {
        next(error);
    }

}

// Ajouter un appareil à un groupe
exports.deviceGroup = async (req, res , next) => {
    try {

        const { device_id, group_id } = req.body;
        
        const deviceGroupExists = await prisma.device_group.findUnique({
            where: { device_id_group_id: { device_id, group_id } }
        });

        if (deviceGroupExists) {
            return res.status(400).json({
                answer: "0",
                comment: 'Un appareil avec ce device_id existe déjà dans ce groupe'
            });
        }

        const deviceGroup = await prisma.device_group.create({
            data: { device_id, group_id }
        });

        return res.status(200).json({
            answer: "1",
            comment: "Appareil ajouté au groupe avec succès",
            result: deviceGroup
        });
        
    } catch (error) {
        next(error);
    }
}
       
module.exports = router;

