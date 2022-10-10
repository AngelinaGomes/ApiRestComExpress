import books from "../models/Book.js";

class BookController {
  static getAllBooks = (req, res) => {
    books.find()
      .populate('author')
      .populate('publisher')
      .exec((err, books) => {
        res.status(200).json(books)
  })
  }

  static getBookById = (req, res) => {
    const {id} = req.params;
    
    books.findById(id)
      .populate('author', 'name')
      .populate('publisher', 'name')
      .exec((err, book) => {
        if (err) {
          res.status(400).send({message: `${err.message} - id not found`});
        } else {
          res.status(200).json(book);
        }      
      })
  }

  static getBookByTitle = (req, res) => {
    const title = req.query.title;

    books.find({'title': title}, {})
    .populate('author', 'name')
    .populate('publisher', 'name')
      .exec((err, book) => {
        if (err) {
          res.send({'message': err.message});
        } else {
          res.status(200).send(book);
        }
      })
  }

  static registerBook = (req, res) => {
    let book = new books(req.body);

    book.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - failed to register book.`});
      } else {
        res.status(201).send(book.toJSON());
      }
    })
  }

  static updateBook = (req, res) => {
    const {id} = req.params;

    books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send({message: 'book successfully updated'});
      }
    })
  }

  static deleteBook = (req, res) => {
    const {id} = req.params;

    books.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send({message: 'book successfully deleted'});
      }
    })
  }
}

export default BookController;