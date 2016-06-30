
'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var resumeController = require('../controllers/resume'),
        auth = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/resumes', auth.isAuth,resumeController.getAll);

    // -------- Retrieve a specific person
    router.get('/resumes/:id_resume', auth.isAuth,resumeController.getResume);

    // -------- Retrieve a specific person
    router.post('/resumes/:id_resume/handshakes', auth.isAuth, resumeController.saveHandshake);

    // -------- Retrieve all handshakes associated to a resume
    router.get('/resumes/:id_resume/handshakes', auth.isAuth, resumeController.loadHandshake);

    // -------- Params catching
    router.param('id_resume', resumeController.findResume);

};