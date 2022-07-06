const res = require('express/lib/response');
//Llamar las rutas y expres
const router = require('express').Router();
//llamar la libreria para encryptar la contraseña
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const moment = require('moment')
const jwt = require('jwt-simple')


const { Users } = require('../../db/database')

router.get('/', async (req, res) => {
    const users = await Users.findAll();
    res.json(users);
});

router.post('/', [
    check('name_user', 'el nombre de usuario es obligatorio').not().isEmpty(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastname', 'el apellido es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatorio').not().isEmpty(),
    check('role', 'el rol es obligatorio').not().isEmpty(),
    check('registro', 'el numero de registro es obligatorio').not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const user = await Users.create(req.body);
        res.json(user);
    });
router.put('/:userId', [
    check('name_user', 'el email es obligatorio').not().isEmpty(),
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastname', 'el apellido es obligatorio').not().isEmpty(),
    check('role', 'el rol es obligatorio').not().isEmpty(),
    check('registro', 'el numero de registro es obligatorio').not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        await Users.update(req.body, {
            where: { id: req.params.userId }
        });
        res.json({ sucess: 'Se ha modificado' });
    });

router.delete('/:userId', async (req, res) => {
    await Users.destroy({
        where: { id: req.params.userId }
    });
    res.json({ sucess: 'Se ha Borrado corrrectamente' });
});

router.post('/login', async (req, res) => {
    const user = await Users.findOne({ where: { name_user: req.body.name_user } });
    if (user) {
        const iguales = bcrypt.compareSync(req.body.password, user.password);
        if (iguales) {
            return res.json({ token: createToken(user), ok: true })
        } else {
            res.json({ error_Msg: 'error en usuario y/o contraseña' });
        }
    } else {
        return res.json({ error_Msg: 'error en usuario y/o contraseña' })
    }
})

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(1, 'h').unix()
    }
    return jwt.encode(payload, 'clave secreta')
}

module.exports = router;