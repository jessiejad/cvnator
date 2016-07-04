/**
 * Created by fanny on 04/07/2016.
 */

angular.module('myResumeApp')
    .controller('updateResumeCtrl', function ($scope, $http, $mdToast, $stateParams,$state) {
var resume;
        var person;
        $http.get('http://localhost:3000/myResume').then(function (result) {

            resume = result.data;

            $scope.resume = resume;
            $scope.template = result.data.defaultTemplate || 'default';
            $scope.person=result.data.person;

            console.log($scope.resume, $scope.template);
        }, function (reason) {
            console.log(reason.status);
            $mdToast.simpleToast("Erreur lors de la récupération du cv")
        });


        

        $scope.changeExperience = function (index) {
            if (index == $scope.resume.experiences.length - 1) {
                $scope.resume.experiences.push('');
            }
        };
        $scope.changeEducation = function (index) {
            if (index == $scope.resume.educations.length - 1) {
                $scope.resume.educations.push('');
            }
        };
        $scope.changeCompetence = function (index) {
            if (index == $scope.resume.competencies.length - 1) {
                console.log("***"+$scope.resume.competencies[0]);
                $scope.resume.competencies.push('');

            }
        };
        $scope.changeHobbie = function (index) {
            if (index == $scope.resume.hobbies.length - 1) {
                $scope.resume.hobbies.push('');
            }
        };

        $scope.max = 4;
        $scope.selectedIndex = 0;
        $scope.nextTab = function () {
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;

        };
        $scope.PrevTab = function () {
            console.log($scope.selectedIndex);
            var index = ($scope.selectedIndex == 0) ? 0 : $scope.selectedIndex - 1;
            $scope.selectedIndex = index;

        };
        console.log($stateParams.resumeId);
        $scope.updateResum = function (resume,person) {

            $http.put('http://localhost:3000/resumes/' + resume._id, resume,person).then(function (result) {
                console.log(result);
                var updatedResumeId = result.data;
                $state.transitionTo('userResume');
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la modification du cv")
            });
        };
        $scope.updatePerson = function (resume,person) {

            $http.put('http://localhost:3000/resumes/' + resume._id,person).then(function (result) {
                console.log(result);
                var updatedPersonId = result.data;
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la modification du cv")
            });
        };
    });

