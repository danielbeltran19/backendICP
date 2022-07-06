const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const apiRouter = require('./routes/api');
const cors = require('cors')
const app = express();

require('./db/database');


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(3001, () => {
    console.log('Servidor escuchado')
})