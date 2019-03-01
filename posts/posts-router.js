const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  const posts = await db.find();
  try {
    res.status(200).send(posts);
  } catch (e) {
    res.status(500).json({error: "The posts information could not be retrieved."});
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const post = await db.findById(id);
    console.log(post ? 'true' : "false")
    post.length > 0
      ? res.status(201).send(post)
      : res.status(404).json({error: "The post with the specified ID does not exist."})
    
  } catch (e) {
    res.status(500).json({error: "The post information could not be retrieved."});
  }
});

router.post('/', async (req, res) => {
  const newMessage = req.body;

  try {
    if(newMessage.title && newMessage.contents) {
      const { id }= await db.insert(newMessage);
      const message = await db.findById(id)
      res.status(201).json(message);
    } else {
      res.status(400).json({errorMessage: 'Please provide title and contents for the post'})
    }
  } catch (e) {
    res.status(500).json({error: 'There was an error while saving the post to the database'})
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await db.findById(id);
    if(post.length > 0) {
      const deleted = await db.remove(id);
      if(deleted > 0) {
        res.status(200).send(post);
      }
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."});
    }
  } catch (e) {
    res.status(500).json({error: "The post could not be removed."});
  }
})

module.exports = router;