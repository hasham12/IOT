'use strict';
angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $http, $interval,$firebaseArray) {
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };
    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };
    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };
    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

//okay ak minute ruk net se nikalta lib name ok
//{"PiValues":{"pins":[null,{"checked":true,"text":"Toggle"},{"checked":true,"text":"Toggle"}],"sensor":[null,{"text":"38*C"},{"text":"50*C"}]}}
    var adaRef = firebase.database().ref("/app");
    adaRef.on('value', function(snapshot) {
      $scope.$apply(function(){
        $scope.gpio = snapshot.val();
        $scope.weather = $scope.gpio.PiValues.sensor[1].Text.split(' ');
        $scope.intruder = $scope.gpio.PiValues.sensor[2].Text;
        $scope.gas = $scope.gpio.PiValues.sensor[3].Text;
        if(parseInt($scope.gas) > 100)
          $scope.gas += " WARNING"
        $scope.current1 = $scope.gpio.PiValues.sensor[4].Text[0];
        $scope.current2 = $scope.gpio.PiValues.sensor[4].Text[1];
        console.log($scope.current1)
        })
    });
    $scope.submit = function(item) {
      item.checked = !item.checked;
    var req = {
    method: 'PUT',
    url: 'https://myfyp-a1836.firebaseio.com/app/PiValues/pins/.json',
    headers: {
      'Content-Type': 'application/json'
    },
     data: $scope.gpio.PiValues.pins
    }
    $http(req).then(function(success)
    {
    },
    function(onError)
    {
    }
    );
    }
})
.controller('HomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  // Set Header

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 30000
      });
  }, 100);

  // Set Ink
  ionicMaterialInk.displayEffect();



})


.controller('sensorCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  // Set Header

  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  // Set Motion
  $timeout(function() {
      ionicMaterialMotion.slideUp({
          selector: '.slide-up'
      });
  }, 300);

  $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000
      });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();


})


.controller('tesseractCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  // Set Motion
  $timeout(function() {
      ionicMaterialMotion.slideUp({
          selector: '.slide-up'
      });
  }, 300);

  $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
          startVelocity: 3000
      });
  }, 700);

  // Set Ink
  ionicMaterialInk.displayEffect();
})



.controller('aboutCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

});
