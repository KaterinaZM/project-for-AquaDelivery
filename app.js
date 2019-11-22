const express = require('express');
const exphbs = require('express-handlebars');
const path = require("path");
const indexRouts = require('./routes/index');
const companydetailsRouts = require('./routes/companydetails');
const registerRouts = require('./routes/register');
const contractRouts = require('./routes/contract');
const plansRouts = require('./routes/plans');
const invoiceRouts = require('./routes/invoice');

const app = express();

const hbs = exphbs.create( {
	defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouts);
app.use('/registration', registerRouts);
app.use('/companydetails', companydetailsRouts);
app.use('/contract', contractRouts);
app.use('/plans', plansRouts);
app.use('/invoice', invoiceRouts);

module.exports = app;