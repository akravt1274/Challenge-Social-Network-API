const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

// init app & middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set routes
app.use(routes);

db.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
