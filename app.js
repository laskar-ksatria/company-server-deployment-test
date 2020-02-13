if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'development') {
    require('dotenv').config();
};

const express = require('express');

const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const morgan = require('morgan');
const Route = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

//MongoDb-connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Welcome to mongoDb');
});

//app-use
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('combined'));

//router;
app.use(Route);
app.use(errorHandler);


app.listen(PORT, () => console.log(
    `Server listening on port ${PORT}`
));