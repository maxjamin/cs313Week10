const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();


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

  		
  		client.query('SELECT * FROM Customer WHERE user_id = 1', [1], (err, res) => {
  		if (err) {
    		throw err
  		}

  		console.log('user:', res.rows[0])
		})


  		res.render('pages/main', res.rows[0]);

  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



