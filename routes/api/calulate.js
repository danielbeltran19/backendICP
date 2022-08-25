const router = require('express').Router();
const { validationResult, check } = require("express-validator");
const { route } = require('./details');


router.post('/amoniacal', [
    check("H5", "El valor de la variable H5 no es un valor numerico valido").isNumeric(),
    check("G5", "El valor de la variable G5 no es un valor numerico valido").isNumeric(),
    check("I5", "El valor de la variable I5 no es un valor numerico valido").isNumeric(),
    check("F5", "El valor de la variable F5 no es un valor numerico valido").isNumeric()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
        }
        const {
            H5,
            G5,
            I5,
            F5
        } = req.body;
        const detail = ((H5 - G5) * I5 * 14000) / F5;
        return res.json(
            {
                ok: true,
                detail: detail.toFixed(3)
            }
        );
    })
router.post('/gravimetricos',[
    check("Vl", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wr", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wre", "El valor de la variable no es un valor numerico valido").isNumeric(),
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    const {
        Vl,
        Wr,
        Wre
    } = req.body;
    try {
        const detail = ((Wre - Wr) * 1000000 ) / Vl;
        return res.json(
            {
                ok: true,
                detail: detail.toFixed(3)
            }
        );
        
    } catch (error) {
        console.log('Error .i.', error)
       return res.status(500).json({
        smsError: 'Internal server error'
       })
    }
})

router.post('/humedad',[
    check("Wrv", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wh", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wrs", "El valor de la variable no es un valor numerico valido").isNumeric(),
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    let {
        Wrv,
        Wh,
        Wrs
    } = req.body;
    try {
        const detail = ((parseFloat(Wh) + parseFloat(Wrv))-Wrs) * 100 / (Wrs-Wrv);
        return res.json(
            {
                ok: true,
                detail: detail.toFixed(3)
            }
        );
        
    } catch (error) {
        console.log('Error .i.', error)
       return res.status(500).json({
        smsError: 'Internal server error'
       })
    }
})

router.post('/grasas',[
    check("Wmh", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Hu", "El valor de la variable no es un valor numerico valido").isNumeric(),
    //check("Wrs", "El valor de la variable no es un valor numerico valido").isNumeric(),
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    const {
        Wmh,
        Hu,
    } = req.body;
    try {
        const detail = Wmh-(Wmh*Hu/100);
        return res.json(
            {
                ok: true,
                detail: detail.toFixed(3)
            }
        );
    } catch (error) {
        console.log('Error .i.', error)
       return res.status(500).json({
        smsError: 'Internal server error'
       })
    }
})

router.post('/grasas2',[
    check("Wbe", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wbv", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wmh", "El valor de la variable no es un valor numerico valido").isNumeric(),
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    const {
        Wbe,
        Wbv,
        Wmh
    } = req.body;
    try {
        const detail = (Wbe*Wbv)*100/Wmh;
        const detail2 = (Wbe-Wbv)*1000000/Wmh;
        return res.json(
            {
                ok: true,
                detail: detail.toFixed(3),
                detail2: detail2.toFixed(3)
            }
        );
    } catch (error) {
        console.log('Error .i.', error)
       return res.status(500).json({
        smsError: 'Internal server error'
       })
    }
})

router.post('/grasas3',[
    check("Wbex", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wbvx", "El valor de la variable no es un valor numerico valido").isNumeric(),
    check("Wmsx", "El valor de la variable no es un valor numerico valido").isNumeric(),
], async (req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    const {
        Wmsx,
        Wbvx,
        Wbex
    } = req.body;
    try {
        const detail = (Wbex-Wbvx)*100/Wmsx;
        const detail2 = (Wbex-Wbvx)*1000000/Wmsx;
        return res.json(
            {
                ok: true,
                detail: detail.toFixed(3),
                detail2: detail2.toFixed(3)
            }
        );
    } catch (error) {
        console.log('Error .i.', error)
       return res.status(500).json({
        smsError: 'Internal server error'
       })
    }
})

module.exports = router;