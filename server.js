const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
//set up handlebars as our template engine of choice
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    // could be replaced with an actual secret
    secret: 'Super secret secret',
    // could put parameters for secret in cookie
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.static() is a built in express middleware function that can take all the contents of a folder and serve them as statis assets
// useful for front end specific files like stylesheets 
app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});
