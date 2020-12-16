const express = require('express');
const itemsRoutes = require('./itemsRoutes');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());

//  apply a prefix to every route in itemsRoutes
app.use("/items", itemsRoutes);

app.get("/", function(req, res) {
    res.send('Index');
});

// 404 Handler
app.use(function(req, res, next) {
    return new ExpressError("Not found", 404);
});

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({ error: err.message});
});

module.exports = app;