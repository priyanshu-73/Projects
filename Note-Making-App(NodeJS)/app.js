const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const mongoStore = require("connect-mongo");
const MongoStore = require('connect-mongo');


require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    // cookie: {maxAge: new Date(Date.now() + (3600000))}
    // Date.now() - 30 * 24 * 60 * 60 * 1000
}))

app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))

// Static Files
app.use(express.static('public'));

//Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));



// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
})


connectDB(process.env.MONGO_URI);

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
    
})
