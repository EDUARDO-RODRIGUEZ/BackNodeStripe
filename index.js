const express = require("express");
const app = express();
const { env } = require("./const");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const host = '192.168.0.5';
const port = 3001;

/*Refactorizar y mejorar*/

const stripe = require("stripe")(env.StripeSecret);

app.post('/api/Payment', async (req, res) => {

    //El tokenId que me llega solo se puede usar en produccion

    const { tokenId, amount } = req.body;

    const payload = {
        amount: amount,
        currency: 'eur',
        source: env.tokenVisaDev,
        description: "Test Payment"
    };

    try {

        const result = await stripe.charges.create(payload);

        return res.status(200).json(result);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error hable con el administrador"
        });
    }

});

/*---------------------*/


app.listen(port, host, () => {
    console.log(`Server corriendo en el host:${host}:${3001}`);
});