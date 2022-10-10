import express from "express"
import PublisherController from "../controllers/publishersController.js"

const router = express.Router();

router
  .get("/publishers", PublisherController.getAllPublishers)
  .get("/publishers/:id", PublisherController.getPublisherById)
  .post("/publishers", PublisherController.registerPublisher)
  .put("/publishers/:id", PublisherController.updatePublisher)
  .delete("/publishers/:id", PublisherController.deletePublisher)

export default router;
