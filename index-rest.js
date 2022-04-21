
const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

app.set('port', 3000)

app.use(express.json())
app.use(cors())

// Process the Search pet service request 
app.get('/api/pets', function(req, res){
	if (Object.keys(req.query).length == 0) {	// find all the documents
		MongoClient.connect(url, function(err, conn) {
			if (err) console.log(err)
			else {
				const db = conn.db('kennel')
				const coll = db.collection('pets')
				coll.find({}).toArray(function(err, result) {
					if (err) console.log(err)
					else {
						conn.close()
						// Send the data back 
						res.type('application/json')
						res.status(200)
						res.json(result)
					}
				})
			}
		})	
	}
})

app.post('/api/pets', function(req, res) {
	// Your custom logic to process the HTTP request 
	console.log(req.body) 
    MongoClient.connect(url, function(err, conn) {
        if (err) console.log(err)
        else {
            const db = conn.db('kennel')
			// Prepare the JS myObj 
			const myObj = new Object()
			myObj.petName = req.body.petName
			myObj.ownerName = req.body.ownerName
			myObj.phoneNumber = req.body.phoneNumber
			myObj.breed = req.body.breed
			myObj.email = req.body.email
			myObj.checkIn = req.body.checkIn
			myObj.checkOut = req.body.checkOut
			myObj.notes = req.body.notes
			myObj.type = req.body.type
			myObj.delete = false
			const coll = db.collection('pets')
			coll.insertOne(myObj, function(err, result) {
                if(err) console.log(err)
                else {
                    conn.close()
                    // send the data back
                    res.type('application/json') // note that this is not text/plain...
                    res.status(200)
                    res.json(result)
                }
            })
        }
    })
})

// "deletes" pet in kennel
app.put('/api/pets/:id', function(req, res){
	const id = req.params.id
	const criteria = {_id : new mongo.ObjectID(req.params.id)}
	const newValues = req.body
	MongoClient.connect(url, function(err, conn) {
	  if (err) throw err;
	  const dbo = conn.db("kennel");
	  dbo.collection('pets').updateOne(criteria, {$set: newValues}, function(err, result){
		  if (err) console.log(err)
		  else {
			  res.type('application/json')
			  res.status(200)
			  res.json(result)
		  }
	  })
	})
})

// app.delete('/api/pets', (req, res) => {
//     res.send("DELETE Request Called")
//     MongoClient.connect(url, function(err, conn) {
//         if (err) throw err;
//         var dbo = conn.db('kennel');
//         var myquery = { petName: "PetName1" };
//         dbo.collection("pets").deleteMany(myquery, function(err, obj) {
//           if (err) throw err;
//           conn.close();
//         });
//       });
//   })


// Employee Data
app.get('/api/employees', function(req, res){
	if (Object.keys(req.query).length == 0) {	// find all the documents
		MongoClient.connect(url, function(err, conn) {
			if (err) console.log(err)
			else {
				const db = conn.db('kennel')
				const coll = db.collection('employees')
				coll.find({}).toArray(function(err, result) {
					if (err) console.log(err)
					else {
						conn.close()
						// Send the data back 
						res.type('application/json')
						res.status(200)
						res.json(result)
					}
				})
			}
		})	
	}
})

app.post('/api/employees', function(req, res) {
	// Your custom logic to process the HTTP request 
    MongoClient.connect(url, function(err, conn) {
        if (err) console.log(err)
        else {
            const db = conn.db('kennel')
			// Prepare the JS myObj 
			const myObj = new Object()
			myObj.employeeID = req.body.employeeID
			myObj.password = req.body.password
			const coll = db.collection('employees')
			coll.insertOne(myObj, function(err, result) {
                if(err) console.log(err)
                else {
                    conn.close()
                    // send the data back
                    res.type('application/json') // note that this is not text/plain...
                    res.status(200)
                    res.json(result)
                }
            })
        }
    })
})


app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})


// // npm init
// 0. in package.json remove the line: type: module for express to run properly!!
// 1. npm install express --save
// 2. npm install --save-dev mongodb
// 3. npm install --save-dev cors
// MAKE SURE MONGODB IS INSTALLED... used these brew commands ot get it installed: brew tap mongodb/brew;brew install mongodb-community
// 4. start the mongodb server: brew services start mongodb-community; (end with: brew services stop mongodb-community)
// 4. run code with node index-rest.js 
// 5. Go to postman to test out the post and gets, or go to port where website is running with Go live button down here vvv

