const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const CaptainSchema = mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3 , 'Fisrtname must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3 , 'Lastname must be at least 3 characters long' ],
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ , 'Please fill a valid email address' ],
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },

    vehicle: {
       color: {
           type: String,
           required: true,
           minlength: [ 3 , 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3 , 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1 , 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle' , 'auto' ],
        },
    },

    locations: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }

});

CaptainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

CaptainSchema.statics.comparePassword = async function(Password) {
    return await bcrypt.compare(Password, this.password);
}

CaptainSchema.statics.hashPassword = async function(Password) {
    return await bcrypt.hash(Password, 10);
}


const captainModel = mongoose.model('Captain', CaptainSchema)

module.exports = captainModel;