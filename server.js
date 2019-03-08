const express = require('express');

const PostsRouter = require('./posts/posts-router');

const server = express();

server.use('/api/posts', PostsRouter);


module.exports = server;