'use strict';

angular.module('myResumeApp')
    .controller('newResumeCtrl', function ($scope, $http, $mdToast, SecurityContext, $mdDialog, $state) {
        var idPerson;
        var imgElement;

        $scope.resume = {
            "experiences": [
                {
                    "start": null,
                    "end": null,
                    "title": "",
                    "company": "",
                    "location": "",
                    "description": [""]
                }
            ],
            "educations": [
                {
                    "start": null,
                    "end": null,
                    "title": "",
                    "school": "",
                    "location": "",
                    "description": [
                        ""
                    ]
                }
            ],
            "hobbies": [
                {
                    "type": "",
                    "content": [
                        {
                            "label": "",
                            "detail": ""
                        }
                    ]
                }
            ],
            "competencies": [
                {
                    "type": "",
                    "content": [
                        {
                            "label": "",
                            "level": ""
                        }
                    ]
                }
            ]
        };
        $scope.resume.experiences.push('');
        $scope.resume.educations.push('');
        $scope.resume.competencies.push('');
        $scope.resume.hobbies.push('');
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
                $scope.resume.competencies.push('');
            }
        };
        $scope.changeHobbie = function (index) {
            console.log($scope.resume.hobbies[0]);
            if (index == $scope.resume.hobbies.length - 1) {
                $scope.resume.hobbies.push('');
            }
        };

        $scope.ajouter = function () {

            function createThumbnail(file) {
                var reader = new FileReader();

                reader.addEventListener('load', function () {

                    imgElement = document.createElement('img');
                    imgElement.style.maxWidth = '150px';
                    imgElement.style.maxHeight = '150px';
                    imgElement.src = this.result;
                    console.log(imgElement);
                    prev.appendChild(imgElement);

                });

                reader.readAsDataURL(file);
            }

            var allowedTypes = ['png', 'jpg', 'jpeg', 'gif'],
                fileInput = document.querySelector('#file'),
                prev = document.querySelector('#prev');

            fileInput.addEventListener('change', function () {

                var files = this.files,
                    filesLen = files.length;

                var imgType = files[0].name.split('.');
                imgType = imgType[imgType.length - 1];

                if (allowedTypes.indexOf(imgType) != -1) {
                    createThumbnail(files[0]);

                }

            });
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

       
        $scope.addPerson = function (person, title,template) {
            console.log(title);
            console.log(template);
            var nom = document.getElementById("nom").value;
            person.name += " " + nom;
            if (imgElement != null) {
                var fichier = imgElement.scr;
                person.photo = fichier;
            }
            $http.post('http://localhost:3000/person', person).then(function (result) {
                console.log(result);
                idPerson = result.data;
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création d'une personne")
            })
        };


        $scope.addResume = function (resume) {
            resume.person = idPerson;
            console.log(resume);
            $scope.resume.experiences.splice($scope.resume.experiences.length - 1, 1);
            $scope.resume.educations.splice($scope.resume.educations.length - 1, 1);

            $http.post('http://localhost:3000/resumes', resume).then(function (result) {
                console.log(result);
                $state.transitionTo('userResume');
            }, function (reason) {
                console.log(reason);
                $mdToast.simpleToast("Erreur lors de la création du cv")

            });
        }
    });
