import authors from "../models/Author.js";

class AuthorController {
  static getAllAuthors = (req, res) => {
    authors.find((err, authors) => {
      res.status(200).json(authors);
    })
  }

  static getAuthorById = (req, res) => {
    const {id} = req.params;
    
    authors.findById(id, (err, authors) => {
      if (err) {
        res.status(400).send({message: `${err.message} - id not found`});
      } else {
        res.status(200).json(authors);
      }      
    })
  }

  static registerAuthor = (req, res) => {
    let author = new authors(req.body);

    author.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - failed to register author.`});
      } else {
        res.status(201).send(author.toJSON());
      }
    })
  }

  static updateAuthor = (req, res) => {
    const {id} = req.params;

    authors.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send({message: 'Author successfully updated'});
      }
    })
  }

  static deleteAuthor = (req, res) => {
    const {id} = req.params;

    authors.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send({message: 'Author successfully deleted'});
      }
    })
  }
}

export default AuthorController;