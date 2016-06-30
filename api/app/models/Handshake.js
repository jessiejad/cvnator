'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema,
    async       = require('async'),
    moment      = require('moment');

//------------------------------------------- Person Schema
var HandshakeSchema = new Schema({

    // --- Relation with a person
    resume  : { type : Schema.Types.ObjectId, ref: 'Resume' },

    // --- Resume Title
    message : String,

    // --- List of experiences
    created : { type : Date, default : Date() },

    // --- Link creator
    createdBy : { type : Schema.Types.ObjectId, ref : 'User' }

});

mongoose.model('Handshake', HandshakeSchema);