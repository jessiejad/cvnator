'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var userController = require('../controllers/user'),
        auth = require('../helpers/auth'),
        resumeController = require('../controllers/resume');

    // -------- Retrieve all person from the database
    router.post('/login', userController.login);

    router.post('/users', userController.create);

    // -------- Find users resume
    router.get('/myResume', auth.isAuth, userController.getResume);

    // -------- Find all favorite resumes for an user
    router.get('/favorites', auth.isAuth, userController.getFavorites);

    // -------- Add a resume to user's favorites
    router.post('/favorites/:id_resume', auth.isAuth, userController.addFavorite);

    // -------- Delete a resume from user's favorites
    router.delete('/favorites/:id_resume', auth.isAuth, userController.deleteFavorite);

    // -------- Params catching
    router.param('id_resume', resumeController.findResume);

};