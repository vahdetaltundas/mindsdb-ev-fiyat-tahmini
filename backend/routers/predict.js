const express = require("express");
const router = express.Router();
const MindsDB = require("mindsdb-js-sdk").default;

router.post("/", async (req, res) => {
    try {
        // MindsDB modelini ve tahmin sorgusunu tanımla
        const homeModel = await MindsDB.Models.getModel("evtahminimodeli", "mindsdb");
        const {
            area,
            bedrooms,
            bathrooms,
            stories,
            mainroad,
            guestroom,
            basement,
            hotwaterheating,
            airconditioning,
            parking,
            prefarea,
            furnishingstatus
        } = req.body;

        const queryOptions = {
            where: [
                `area = ${area}`,
                `bedrooms = ${bedrooms}`,
                `bathrooms = ${bathrooms}`,
                `stories = ${stories}`,
                `mainroad = '${mainroad}'`,
                `guestroom = '${guestroom}'`,
                `basement = '${basement}'`,
                `hotwaterheating = '${hotwaterheating}'`,
                `airconditioning = '${airconditioning}'`,
                `parking = '${parking}'`,  // parking özelliğini tek tırnak içinde yazın
                `prefarea = '${prefarea}'`,
                `furnishingstatus = '${furnishingstatus}'`,
            ],
        };
        

        // MindsDB'den tahmin yap
        const prediction = await homeModel.query(queryOptions);
        const homePrice = prediction.value;

        res.status(200).json({
            homePrice: homePrice,
        });
    } catch (error) {
        console.error("Ev fiyatı tahmini yapılamadı:", error);
        res.status(500).json({
            message: "Ev fiyatı tahmini yapılamadı.",
            error: error,
        });
    }
});

module.exports = router;
