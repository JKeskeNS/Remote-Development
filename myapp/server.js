// Server.js

// Base Setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://JMK:KMJ@ds011331.mlab.com:11331/jkeske_test');

var User = require('../myapp/models/user');

//Configure app to use bodyParser()
//This will let us get data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Routes for our API
var router = express.Router()

router.use(function(req,res,next){
	console.log('Something is happening');
	next();
})

router.get('/', function(req,res) {
	res.json({ message: 'hooray! welcome to our API!'});
});

router.route('/users')

		.post(function(req,res) {
			var user = new User();
			user.name = req.body.name;
			user.server = req.body.server;
			user.userName = req.body.userName;

			user.save(function(err) {
				if(err){
					res.send(err);
				} else {

				res.json({ message: 'User created'});
				}
				

			});
			
			
		})

		.get(function(req,res) {
			User.find(function(err, users) {
				if(err)
					res.send(err);

				res.json(users);
			});
		});

router.route('/users/:user_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    	.get(function(req,res) {
			User.findOne({ _id : req.params.user_id},function(err, users) {
				if(err)
					res.send(err);

				res.json(users);
			});
		})

        .put(function(req, res) {

        // use our bear model to find the bear we want
       	 User.findOne({ _id : req.params.user_id}, function(err, user) {

            	if (err)
                	res.send(err);

           		user.name = req.body.name; 
           		user.userName = req.body.userName;
           		user.server = req.body.server;
             // update the bears info

            // save the bear
           		 user.save(function(err) {
               	 if (err)
                  	  res.send(err);

               	 res.json({ message: 'User updated!' });
          	  });

        	});
    	})

    	.delete(function(req, res) {
        User.remove({
            _id : req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



// Register our routes

app.use('/api', router);

app.use(express.static(__dirname + '/public'));

// Start the Server
app.listen(3000);
console.log('Magic happens on port 3000');