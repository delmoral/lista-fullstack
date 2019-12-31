const express = require('express');
const morgan = require('morgan');

const cors = require('cors');

// Initializations
const {mongoose} = require('./database');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
app.use('/api/lists', require('./routes/list.routes'));
app.use('/api/products', require('./routes/products.routes'));

// Starting
app.listen(app.get('port'), ()=>{
    console.log('Server listening on port: ' + app.get('port'));
})
