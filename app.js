const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Book = require('./models/bookModel');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

bookRouter
	.post('/books', (req, res) => {
		const book = new Book(req.body);
		book.save();
		return res.status(201).json(book);
	})
	.get('/books', (req, res) => {
		const { query } = req;
		Book.find(query, (err, books) => {
			if (err) {
				res.status(500);
				return res.send('An error occurred');
			}
			if (books.length === 0) {
				res.statusCode = 404;
				return res.send('No matching book');
			}
			return res.send(books);
		});
	})
	.get('/books/:bookId', (req, res) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				res.statusCode = 500;
				return res.send('An error occurred');
			}
			return res.send(book);
		});
	});

app.use('/api', bookRouter);

app.get('/', (req, res) => res.send('Welcome to my API'));
app.listen(port);
