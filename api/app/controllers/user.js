var UserController = exports;


//--------------------------------------- Module dependencies.
var mongoose 	= require('mongoose'),
    User 		= mongoose.model('User'),
    Util        = require('../helpers/appUtils'),
    async       = require('async'),
    moment      = require('moment'),
    _           = require('lodash');

/**
 * Login on API
 * @param req
 * @param res
 */
UserController.login = function(req, res){

    Util.info('Try to log to API');

    User.findOne({username : req.body.username, password : req.body.password}).exec(function(err, user){

        if(user){
            user.token = moment().valueOf();
            user.save(function(err, result){
                res.status(200).json({token : user.token, _id : user._id});
            })
        }else{
            res.status(404).json({message : "user not found"});
        }

    });

};

/**
 *
 * @param req
 * @param res
 */
UserController.create = function(req, res){

    Util.info('Create an user');

    var user = new User(req.body);
    user.token = moment().valueOf();

    user.save(function(err, result){
        if(err){
            res.status(400).json({message : "create user error"});
        }else{
            res.status(200).json({token : user.token, _id : user._id});
        }
    })

};