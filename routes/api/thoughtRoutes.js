const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(addThought);

// /api/thoughts/:thoughtid
router
  .route('/:thoughtid')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtid/reactions
router
  .route('/:thoughtid/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtid/reactions/reactionid
router
  .route('/:thoughtid/reactions/:reactionid')
  .delete(deleteReaction);

module.exports = router;
