'use strict';

angular.module('myResumeApp')
    .controller('userResumeCtrl', function ($scope, $http, $mdToast, $stateParams, $mdDialog, $state) {

        var resume;
        // ---- Call API to get users resume

        $http.get('http://localhost:3000/myResume').then(function (result) {
            
            resume = result.data;
            $scope.resume = resume;
           $scope.template = result.data.defaultTemplate || 'default';

            console.log($scope.resume, $scope.template);
        }, function (reason) {
            console.log(reason.status);
            if (reason.status) {
                $state.transitionTo("newResume");
            }
            $mdToast.simpleToast("Erreur lors de la récupération du cv")
        });

        var deleteResume = function (id) {
            // ---- Call API to delete a resume
            $http.delete('http://localhost:3000/resumes/' + id).then(function (result) {
                console.log(result);
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la suppression du cv")
            });
        };

        $scope.deleteConfirm = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Souhaitez-vous réellement supprimer votre CV ?')
                .textContent('La suppression de votre CV entraine la suppression de toutes les données associées')
                .ariaLabel('Jsp')
                .targetEvent(ev)
                .ok('Supprimer')
                .cancel('Annuler');
            $mdDialog.show(confirm).then(function () {
                deleteResume(resume._id);
                console.log("Deleted resume " + resume._id);
                $state.go("accueilCv");
            }, function () {
                // cancel
            });
        };

        $scope.updateResume = function () {
            $state.transitionTo('updateResume')
        };

    });