const res = require('express/lib/response');
const router = require('express').Router();
const { check, validationResult } = require('express-validator')
const { Techniques } = require('../../db/database')

router.get('/', async (req, res) => {
    const techniques = await Techniques.findAll();
    return res.json(techniques);
});

router.post('/', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('classification', 'la clasificacion es obligatoria').not().isEmpty(),
],

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
        }
        const techniques = await Techniques.create(req.body);
        return res.json(techniques);
    });

router.put('/:techniquesId', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('classification', 'la clasificacion es obligatoria').not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
        }
        await Techniques.update(req.body, {
            where: { id: req.params.techniquesId }
        });
        return res.json({ sucess: 'Se ha modificado' });
    });

router.delete('/:techniquesId', async (req, res) => {
    await Techniques.destroy({
        where: { id: req.params.techniquesId }
    });
    return res.json({ sucess: 'Se ha Borrado corrrectamente' });
});

module.exports = router;