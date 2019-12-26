const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const image = require('./routes/api/image');
var cors = require('cors');

const app = express();

//BodyParser Middleware
app.use(express.json());
app.use(cors());

//DB Config
const db = config.get('mongoURI');

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log(err));

//Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/login'));
// app.use('/api/profile', require('./routes/api/profile'));
// app.use('/image', require('./routes/api/image'));

app.put('/image' , (req, res) => { image.handleImage(req, res, db) });
app.post('/imageUrl' , (req, res) => { image.handleApiCall(req, res) });

//Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
// 	//Set static folder
// 	app.use(express.static('../frontend/build'));

// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
// 	});
// }

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on ${port}`));
