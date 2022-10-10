import publishers from "../models/Publisher.js";

class PublisherController {
  static getAllPublishers = (req, res) => {
    publishers.find((err, publishers) => {
      res.status(200).json(publishers);
    })
  }

  static getPublisherById = (req, res) => {
    const {id} = req.params;
    
    publishers.findById(id, (err, publishers) => {
      if (err) {
        res.status(400).send({message: `${err.message} - id not found`});
      } else {
        res.status(200).json(publishers);
      }      
    })
  }

  static getPublisherByName = (req, res) => {
    const name = req.query.name;

    publishers.find({'name': name}, {}, (err, publisher) => {
      if (err) {
        res.send({'message': err.message});
      } else {
        res.status(200).send(publisher);
      }
    })
  }

  static registerPublisher = (req, res) => {
    let publisher = new publishers(req.body);

    publisher.save((err) => {
      if (err) {
        res.status(500).send({message: `${err.message} - failed to register publisher.`});
      } else {
        res.status(201).send(publisher.toJSON());
      }
    })
  }

  static updatePublisher = (req, res) => {
    const {id} = req.params;

    publishers.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send({message: 'publisher successfully updated'});
      }
    })
  }

  static deletePublisher = (req, res) => {
    const {id} = req.params;

    publishers.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({message: err.message});
      } else {
        res.status(200).send({message: 'publisher successfully deleted'});
      }
    })
  }
}

export default PublisherController;