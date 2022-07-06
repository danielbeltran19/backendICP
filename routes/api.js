const router = require('express').Router();

const apiUsersRoute = require('./api/users');
const apiTasksRoute = require('./api/tasks');
const apiDetailsRoute = require('./api/details');
const apiTechniquesRoute = require('./api/techniques');
const apiCalculateRoute = require('./api/calulate');
const middlewares = require('./middlewares');
const { route } = require('express/lib/application');

router.use('/users', apiUsersRoute);
router.use('/calculo', apiCalculateRoute);
router.use('/techniques', apiTechniquesRoute);
router.use('/tasks', apiTasksRoute);
router.use('/details', apiDetailsRoute);


module.exports = router;