app.controller("HeaderController", function ($window, $mdDialog, $mdSidenav, $scope, $rootScope) {
    var hc = this;
    hc.isLogged = function () {
        return (window.localStorage.getItem("access_token")) ? true : false
    };
    hc.logOut = function(){
        localStorage.removeItem("access_token");
        window.location.reload();   
    }
    hc.openSideNav = function () {
        watchNavbar = $rootScope.$watch(function () {
            return $mdSidenav('right-menu').isOpen();
        }, function (newvalue, oldvalue) {
            if (oldvalue == true && newvalue == false) {
                // we're closing the SideNav with clickoutside
                angular.element(document.querySelector("body")).css("overflow", "");
                watchNavbar(); // disable the watchdog
            }
        });
        angular.element(document.querySelector("body")).css("overflow", "hidden");
        $mdSidenav('right-menu').open();
    };

    hc.closeSideNav = function () {
        angular.element(document.querySelector("body")).css("overflow", "");
        watchNavbar(); // disable the watchdog
        $mdSidenav('right-menu').close();
    }

    hc.closeSideNav = function() {
        angular.element(document.querySelector("body")).css("overflow", "");
        watchNavbar(); // disable the watchdog
        $mdSidenav('right-menu').close();
    }
});