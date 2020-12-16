const express = require('express');
const ExpressError = require('./expressError');
const items = require('./fakeDb');

const router = new express.Router();

router.get("/", function(req, res, next) {
    try {
        return res.json(items);
    } catch(err) {
        return next(err);
    }
});

router.post("/", function(req, res, next) {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("Invalid Data", 400)
        let newItem = {
            name: req.body.name,
            price: req.body.price
        }
        items.push(newItem);
        return res.json({message: `${newItem.name} added successfully`});
    } catch(err) {
        return next(err);
    }
});

router.get("/:name", function(req, res, next) {
    try {
        let foundItem = items.find(item => item.name.toLowerCase() === req.params.name.toLowerCase());
        return res.json(foundItem);
    } catch(err) {
        return next(err);
    }
});

router.patch("/:name", function(req, res, next) {
    try {
        let foundItemIndex = items.findIndex(item => item.name.toLowerCase() === req.params.name.toLowerCase());
        items[`${foundItemIndex}`].name = req.body.name || items[`${foundItemIndex}`].name;
        items[`${foundItemIndex}`].price = req.body.price || items[`${foundItemIndex}`].price;
        return res.json({
            updated: {
                name: items[`${foundItemIndex}`].name,
                price: items[`${foundItemIndex}`].price
            }
        });
    } catch(err) {
        return next(err);
    }
});

router.delete("/:name", function(req, res, next) {
    try {
        let foundItemIndex = items.findIndex(item => item.name.toLowerCase() === req.params.name.toLowerCase());
        items.splice(foundItemIndex, 1);
        return res.json({ message: "Deleted" })
    } catch(err) {
        return next(err);
    }
});

module.exports = router;