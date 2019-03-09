const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');

const pool = new Pool({
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

	getPerson(req, res);
	console.log("Test04")		
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getPerson(request, response) {
	// First get the person's id
	var id = request.query.userName;
	var pssword = request.query.password;
	var answer = 68;

	getPersonFromDb(id, pssword, function(error, result) {
		//callback function
		console.log("Test01" + answer);
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.json(result[0]);

		}
	});
	console.log("Test03");
}

function getPersonFromDb(id, password, callback) {
	console.log("Getting person from DB with : " + id);

	var sql = "SELECT * FROM Customer WHERE username = $1::varchar AND user_password = $2::varchar";
	var params = [id, password];

	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
		
	});

}

/*
billmaxer"
email	"userOne@gmail.com"
user_password	"Norway40065"

*/
