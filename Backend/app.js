const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes'));
app.use('/api/weather', require('./routes/weather'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});