
'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var personController = require('../controllers/person'),
        auth             = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.get('/people',  auth.isAuth,personController.getAll);

    // -------- Retrieve a specific person
    router.get('/people/:id_person',  auth.isAuth,personController.getPerson);

    // -------- Create person
    router.post('/person',  auth.isAuth, personController.createPerson);

    // -------- Params catching
    router.param('id_person', personController.findPerson);

};