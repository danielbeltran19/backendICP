const router = require('express').Router();
const { Details, Tasks, Users, Techniques, sequelize } = require('../../db/database')
let basicMath = require('advanced-calculator');
const { validationResult, check } = require("express-validator");

router.get('/consulta', async (req, res) => {
    try {
        const respuesta = await Users.findAll(
               {include: [Tasks]}
        );

        return res.json(respuesta);
    } catch (error) {
        return res.json(error.message);
    }


});

router.get('/', async (req, res) => {
    const details = await Details.findAll();
    res.json(details);
});

router.post('/', [
    check("submision", "campo vacio").notEmpty(),
    check("sample", "campo vacio").notEmpty(),
    check("fecha", "campo vacio").notEmpty(),
    check("id_tasks", "campo vacio").notEmpty(),
    check("id_techniques", "campo vacio").notEmpty(),
    check("details", "campo vacio").notEmpty(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    const {
        submision,
        sample,
        fecha,
        id_tasks,
        id_techniques,
        details
    } = req.body;
    const detail = await Details.create(
        {
            submision,
            sample,
            fecha,
            id_tasks,
            id_techniques,
            details
        }
    );
    res.json({ detail, ok: true })
})


router.put('/:detailsId', [
    check("submision", "campo vacio").notEmpty(),
    check("sample", "campo vacio").notEmpty(),
    check("fecha", "campo vacio").notEmpty(),
    check("id_tasks", "campo vacio").notEmpty(),
    check("id_techniques", "campo vacio").notEmpty(),
    check("details", "campo vacio").notEmpty(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    await Details.update(req.body, {
        where: { id: req.params.detailsId }
    })
    return res.json({ sucess: 'Se han modificado los datos' });
});

router.delete('/:detailsId', async (req, res) => {
    await Details.destroy({
        where: { id: req.params.detailsId }
    });
    res.json({ sucess: 'Se ha Borrado corrrectamente' });
});


module.exports = router;
