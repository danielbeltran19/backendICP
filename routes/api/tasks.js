const res = require('express/lib/response');
const router = require('express').Router();
const {validationResult, check} =  require("express-validator");
const  {Tasks}  = require('../../db/database')

router.get('/', async(req, res)=>{
    const tasks = await Tasks.findAll();
    res.json(tasks);
});

router.post('/',[

    check('submision', 'el submision es obligatorio').not().isEmpty(),
    check('id_samples', 'el id sample es obligatorio').not().isEmpty(),
    check('fecha', 'la fecha es obligatoria').not().isEmpty(),
    check('id_user', 'el usuario es obligatorio').not().isEmpty(),
    check('id_techniques', 'la tecnica es obligatoria').not().isEmpty(),

], async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    const task = await Tasks.create(req.body);
    res.json(task);
});

router.put('/:tasksId', [
    check('submision', 'el submision es obligatorio').not().isEmpty(),
    check('id_samples', 'el id sample es obligatorio').not().isEmpty(),
    check('fecha', 'la fecha es obligatoria').not().isEmpty(),
    check('id_user', 'el usuario es obligatorio').not().isEmpty(),
    check('id_techniques', 'la tecnica es obligatoria').not().isEmpty(),

],async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array() })
    }
    await Tasks.update(req.body, {
        where: { id: req.params.tasksId }
    });
    res.json({sucess: 'Se ha modificado'});
});

router.delete('/:tasksId', async(req, res)=>{
    await Tasks.destroy({
        where: { id: req.params.tasksId }
    });
    res.json({sucess: 'Se ha Borrado corrrectamente'});
});

module.exports = router;