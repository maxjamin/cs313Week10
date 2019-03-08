const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});


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

		try {
      		const client = await pool.connect()
      		const result = await client.query('SELECT * FROM Customers');
      		const results = { 'results': (result) ? result.rows : null};
      		res.render('pages/db', results );
      		client.release();
    	} catch (err) {
      		console.error(err);
      		res.send("Error " + err);
    	}  		

  		res.render('pages/main', res.rows[0]);

  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



