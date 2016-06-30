'use strict';

module.exports = function(router) {
    //------ LOAD CONTROLLER
    var userController = require('../controllers/user'),
        auth = require('../helpers/auth');

    // -------- Retrieve all person from the database
    router.post('/login', userController.login);

    router.post('/users', userController.create);

};