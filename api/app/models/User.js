//------ Model USER
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema,
    async       = require('async'),
    path		= require('path');

//------------------------------------------- User Validator
var validatePresenceOf = function(value) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    return (value && value.length);
};

//------------------------------------------- User Schema
var UserSchema = new Schema({

    username : {
        type		: String,
        unique		: true,
        required	: true
    },

    password : {
        type		: String,
        validate	: [validatePresenceOf, 'Password cannot be blank']
    },

    token : String,

    favorites : {
        resumes: [
            {type: Schema.Types.ObjectId, ref: 'Resume'}
        ]
    },

    resume : {type: Schema.Types.ObjectId, ref: 'Resume'}

});

//------------------------------------------- User Static function
UserSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

UserSchema.statics.findByToken = function(token, cb){
    this.findOne({
        token:token
    }).exec(cb);
};

mongoose.model('User', UserSchema);
