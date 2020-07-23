const express = require('express');
const hbs = require('express-handlebars');
const router = require('./routes');
const parseRequest = require('./parseRequest');

const app = express();

const staticOptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  maxAge: '1d',
  redirect: false,
};

app.use(express.static('public', staticOptions));
app.use(parseRequest);

app.engine( 'hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts',
}));

app.set('view engine', 'hbs');

app.use(router);

app.listen(8080, () => console.log('server Started'));

console.log(`Server listening at http://localhost:3000`);