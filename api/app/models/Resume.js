//------ Model RESUME
'use strict';

//--- Module dependencies
var mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema,
    async       = require('async'),
    moment      = require('moment');

//------------------------------------------- User Validator
var validatePresenceOf = function(value) {
    // If you are authenticating by any of the oauth strategies, don't validate.
    var Person = mongoose.model("Person");
    Person.findOne({_id : value}).exec(function(err, result){
        console.log(result);
        if(result == null) {
            return false;
        }
        return true;
    })
};

//------------------------------------------- Person Schema
var ResumeSchema = new Schema({

    // --- Relation with a person
    person : {
        type : Schema.Types.ObjectId, ref: 'Person',
        required : true,
        validate	: [validatePresenceOf, 'Person have to be a real one']
    },

    // --- Resume Title
    title        : {
        type : String,
        required : true
    },

    defaultTemplate : String,

    // --- List of experiences
    experiences : [{
        "start"     : String,
        "end"       : String,
        "title"     : String,
        "company"   : String,
        "location"  : String,
        "description" : [String]
    }],
    // --- List of education
    "educations" : [{
        "start"     : String,
        "end"       : String,
        "title"     : String,
        "school"    : String,
        "location"  : String,
        "description" : [String]
    }],
    // --- List of hobbies
    "hobbies" : [{
        "label" : String,
        "content" : [{
            "label" : String,
            "detail" : String
        }]
    }],
    // --- List of competencies
    "competencies" : [{
        "label" : String,
        "content" : [{
            "label" : String,
            "level" : String
        }]
    }],

    "extra" : String,

    "isUserFavorite" : Boolean,

    "handshakes" : [{ type :  Schema.Types.ObjectId, ref: 'Handshake'}]

});

mongoose.model('Resume', ResumeSchema);