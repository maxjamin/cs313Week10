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
  		var sql = 'SELECT * FROM Customer WHERE user_id= $1::int';
  		var params = 1;
  		
  		client.query(sql, params, (err, res) => {
  		if (err) {
    		console.log("Error in query: ")
			console.log(err);
			callback(err, null);
  		}

  		console.log("TEST 01: " + res.rows);
		})


  		res.render('pages/main', res.rows[0]);

  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



