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

	getPersonFromDb(id, function(error, result) {
		//callback function
		console.log("Test01" + answer);
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.render('pages/main', person);

		}
	});
	console.log("Test03");
}



function getPersonFromDb(id, callback) {
	console.log("Getting person from DB with username: " + id);

	var sql = "SELECT * FROM Customer WHERE username = $1::varchar";
	var params = [id];

	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
		console.log("Test02");
	});

}




