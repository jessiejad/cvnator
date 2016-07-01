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

UserController.getResume = function(req, res){

    Util.info('Load users Resume');

    User.findOne({ token : req.current_user.token }).populate('resume').exec(function(error, result) {
        console.log(result);
        res.status(200).json(result.resume);
    });

};


/**
 * Load users favorite resumes
 * @param req
 * @param res
 */
UserController.getFavorites = function(req, res){

    Util.info('Load all user\'s favorite resumes');

    User.findOne({ token : req.current_user.token }).populate('favorites.resumes').exec(function(error, result) {
        console.log(result);
        res.status(200).json(result.favorites.resumes);
    });

};

/**
 * Add a resume to users favorites
 * @param req
 * @param res
 */
UserController.addFavorite = function(req, res){

    Util.info('Add resume to users favorites');

    console.log(req.current_user.favorites.resumes.indexOf(req.current_resume._id));
    if (req.current_user.favorites.resumes.indexOf(req.current_resume._id) === -1) {
        req.current_user.favorites.resumes.push(req.current_resume);
        req.current_user.save();
        res.status(200).json(req.current_resume._id);
    }
    res.status(200).json("already exists");
};

/**
 * Delete a resume from users favorites
 * @param req
 * @param res
 */
UserController.deleteFavorite = function(req, res){

    Util.info('Delete resume from users favorites');

    var i = req.current_user.favorites.resumes.indexOf(req.current_resume._id)
    if ( i !== -1) {
        req.current_user.favorites.resumes.splice(i, 1);
        req.current_user.save();
        res.status(200).json(req.current_user);
    }
    res.status(200).json("doesnt exist");
};