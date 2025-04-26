const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');
const User = require('../models/user');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query on the console
        // console.log(q);

        if (!q || q.length === 0) {
            return res.status(404).json({ message: "No trips found" });
        } else {
            return res.status(200).json(q);
        }
    };

// GET: /trips:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return a single record
        .exec();

        // Uncomment the following line to show results of query on the console
        // console.log(q);

        if (!q || q.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        } else {
            return res.status(200).json(q);
        }
    };

// PUT: /trips/:tripCode - Adds a new trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip
            .findOneAndUpdate({'code': req.params.tripCode }, {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }, { new: true })
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                res.send(trip);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                return res
                    .status(500) //server error
                    .json(err);
            });
    });
}

const tripsAddTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
        (err, trip) => {
            if (err) {
                return res
                    .status(400) //bad request
                    .json(err);
            } else {
                return res
                    .status(201) //created
                    .json(trip);
            }
        });
    });
}

const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        User
            .findOne({ email : req.auth.email })
            .exec((err, user) => {
                if (!user) { 
                    return res  
                        .status(404)
                        .json({"message": "Email not found"});
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);

                }
                callback(req, 
                    res.json({"message": "User found"}), 
                    console.log('callback'),
                    console.log(req.auth)
                    
                    );


                });
    } else {
        
        return res
            .status(404)
            .json({"message": "User not found"});
            console.log(req.payload);
            
    }
};

const tripsDeleteTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip
            .findOneAndDelete({ 'code': req.params.tripCode })
            .then(trip => {
                if (!trip) {
                    return res
                        .status(404)
                        .send({
                            message: "Trip not found with code " + req.params.tripCode
                        });
                }
                res
                    .status(200)
                    .send({
                        message: "Trip successfully deleted",
                        trip: trip
                    });
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({
                        message: "Error deleting trip with code " + req.params.tripCode,
                        error: err
                    });
            });
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    getUser
}