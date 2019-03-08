const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var express = require('express');
var app = express();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/main', (req, res) => res.render('pages/main'))

  .get('/logInUser', (req, res) => {
  	//controller
  		console.log("loginUser request");
  		var name = req.query.userName;
  		var pass = req.query.password;

  		var par = {userName:name, password:pass};

  		res.render('pages/main', par);

  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



