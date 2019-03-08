const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg')
const pool = new Pool()

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

  		pool.on('error', (err, client) => {
  		console.error('Unexpected error on idle client', err)
  		process.exit(-1)
		})

  		// callback - checkout a client
		pool.connect((err, client, done) => {
		  if (err) throw err
		  client.query('SELECT * FROM Customer WHERE user_id = $1', [1], (err, res) => {
		    done()

		    if (err) {
		      console.log(err.stack)
		    } else {
		      console.log(res.rows[0])
		    }
		  })
		})

  		res.render('pages/main', par);

  })

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



