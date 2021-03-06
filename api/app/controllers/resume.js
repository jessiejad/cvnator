// ======================================================
// RESUME Main controller ===============================
// ======================================================
var ResumeController = exports;


//--------------------------------------- Module dependencies.
var mongoose 	= require('mongoose'),
    Resume 		= mongoose.model('Resume'),
    Person 		= mongoose.model('Person'),
    Handshake   = mongoose.model('Handshake'),
    moment      = require('moment'),
    Util        = require('../helpers/appUtils'),
    async       = require('async'),
    _           = require('lodash');

/**
 * Load all resumes
 * @param req
 * @param res
 */
ResumeController.getAll = function(req, res){

    Util.info('Load all resume');

    Resume.find(req.query).populate('person').exec(function(err, results){
    //Resume.find({}).populate('person').exec(function(err, results){
        if(err){
            res.status(400).json({message : "Error Loading Resume"})
        }else{
            var resultsFormatted = [];

            async.forEach(results, function(result, callback){

                result.isUserFavorite = false;

                if(req.current_user.favorites.resumes.indexOf(result._id) !== -1) {
                    console.log("is favorite");
                    result.isUserFavorite = true;
                }

                // --- Treatment about resume formatted
                resultsFormatted.push({
                    isUserFavorite : result.isUserFavorite,
                    person : result.person,
                    title  : result.title,
                    _id    : result._id
                });

                callback();

            },function(){
                res.status(200).json(resultsFormatted)
            })

        }
    })
};

/**
 * Find a specific resume from database
 * @param req
 * @param res
 * @param next
 * @param id
 */
ResumeController.findResume = function(req, res, next, id){

    Util.info('Find resume '+ id);

    Resume.findOne({_id : id}).exec(function(err, resume){
        // --- Manage error
        if(err){
            res.status(400).json({message : "Error Loading Resume"});
        }
        // --- Maybe no one found
        if(!resume){
            res.status(404).json({message : "Resume not found"});
        }else{
            // --- Load the person associated
            Person.findOne({_id : resume.person}).populate('contact.address').exec(function(err, person){
                resume.person = person;
                req.current_resume = resume;
                next();
            })
        }
    })
};
/**
 * Return resume detail
 * @param req
 * @param res
 */
ResumeController.getResume = function(req, res){
    Util.info('Get resume '+ req.current_resume._id);

    var resume = req.current_resume;
    resume.isUserFavorite = false;

    if(req.current_user.favorites.resumes.indexOf(req.current_resume._id) !== -1) {
        console.log("is favorite");
        resume.isUserFavorite = true;
    }

    //console.log(resume);
    res.status(200).json(resume);
};
/**
 * Save a handshake
 * @param req
 * @param res
 */
ResumeController.saveHandshake = function(req, res){
    Util.info('Save handshake for '+ req.current_resume._id);

    // --- Create a new handshake
    var handshake = new Handshake({
        createdBy   : req.current_user,
        resume      : req.current_resume,
        message     : req.body.message
    });
    handshake.save();

    // --- Add association to resume
    req.current_resume.handshakes.push(handshake);
    req.current_resume.save();

    // --- Return message than is done
    res.status(204).json({message : "DONE"});
};
/**
 * Load all handshake for a resume
 * @param req
 * @param res
 */
ResumeController.loadHandshake = function(req, res){

    Util.info('Load handshake for '+ req.current_resume._id);

    Handshake.find({resume : req.current_resume}).populate('createdBy').exec(function(err, handshakes){
        if(err){
            res.status(400).json({message : "Error during load handshake"});
        }else{
            res.status(200).json(handshakes);
        }
    })
};

/**
 * Create a resume
 * @param req
 * @param res
 */
ResumeController.createResume = function(req,res){
    Util.info('Create resume ');

    var myResume = new Resume(req.body);
    myResume.validate(function(error){
        console.log(error);
        if(!error){
            myResume.save(function(err,data){
                if(err){
                    Util.error(err);
                    res.status(400).json({message : err});
                }else{
                    req.current_user.resume = myResume;
                    req.current_user.save();
                    //res.status(200).json({id : myResume._id});
                    res.status(200).json(req.current_user);
                }
            })
        }

    })
};

/**
 * Delete a resume
 * @param req
 * @param res
 */
ResumeController.deleteResume = function(req,res){
    req.current_resume.remove();
    res.status(200).json({id : req.current_resume._id});
}

/**
 * Update a resume
 * @param req
 * @param res
 */
ResumeController.updateResume = function(req,res){
    req.current_resume.update(req.body, function(err, result) {
        console.log(err, result);
        res.status(200).json({id : req.current_resume});
    });
}