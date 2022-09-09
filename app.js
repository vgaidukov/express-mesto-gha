const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { errorHandler } = require('./utils/errorHandler');


const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '631b0c26c6647dc29bd3a6e8'
  };
  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});