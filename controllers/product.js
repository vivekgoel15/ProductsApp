var Product = require('../models/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Products controller!');
};

exports.product_create = function (req, res) {
    const product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save()
	.then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.status(500).send(err);	
    });
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id)
	.then(product => {
        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send(err);
        }
        return res.status(500).send(err);
    });
};

exports.products = function (req, res) {
    Product.find()
	.then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send(err);
    });
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	.then(result => {
        res.status(200).send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send(err);
        }
        return res.status(500).send(err);
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id)
	.then(() => {
        res.status(204).send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send(err);
        }
        return res.status(500).send(err);
    });
};