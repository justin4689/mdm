const express = require('express');
const router = express.Router();


//Obtenir Code Qr ou  Unique code

router.get('/qr-code', (req, res) => {
    const qrCode = generateQrCode();
    res.json({ qrCode });
});







module.exports = router;






