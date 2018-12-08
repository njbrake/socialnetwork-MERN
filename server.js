const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body Parser Middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config

const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose
	.connect(
		db,
		{ useNewUrlParser: true },
	)
	.then(() => console.log('mongodb connected'))
	.catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on PORT ${port}`));
