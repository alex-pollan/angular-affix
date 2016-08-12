var app = angular.module('plunker', []);

app.controller('MainCtrl', function ($scope) {
    $scope.name = 'World';
    $scope.texts = {text1 : "One big line of meaningless gibberish text... One big line of meaningless gibberish text... One big line of meaningless gibberish text... One big line of meaningless gibberish text... "};
    $scope.addText1 = function(){
        $scope.texts.text1 =  $scope.texts.text1 
            + "Another One big line of meaningless gibberish text... One big line of meaningless gibberish text... One big line of meaningless gibberish text... One big line of meaningless gibberish text... ";  
    };
});

app.directive('dellAffix', ['$window', function dellAffix($window) {
    return {
        restrict: 'A',
        link: link
    };

    function link($scope, $element, attrs) {
        var win = angular.element($window),
            offsetTop = parseInt(attrs.offsetTop || 0),
            offsetBottom = parseInt(attrs.offsetBottom || 0),
            elementTop = parseInt($element[0].offsetTop || 0);

        $scope.$on('$stateChangeStart', function () {
            win.unbind('scroll', affixElement);
        });

        win.bind('scroll', function () {
            affixElement();
        });
        
        affixElement();

        function affixElement() {            
            var elementHeight = parseInt($element[0].offsetHeight || 0),
                windowHeight = ($window.innerHeight || $window.document.documentElement.clientHeight),
                windowPageYOffset = getScrollOffsets().y,
                maxBottom = parseInt(windowPageYOffset) + parseInt(windowHeight),
                elementBottom = parseInt(elementTop + elementHeight);

            if (windowPageYOffset > (elementTop - offsetTop)) {
                $element.css('position', 'fixed');
                $element.css('top', offsetTop + 'px');
            } else if (maxBottom < (elementBottom + offsetBottom)) {
                $element.css('position', 'fixed');
                $element.css('bottom', offsetBottom + 'px');
            } else {
                $element.css('position', '');
                $element.css('top', '');
                elementTop = parseInt($element[0].offsetTop || 0);
            }
        }
    }

    function getScrollOffsets() {
        // This works for all browsers except IE versions 8 and before
        if ($window.pageXOffset !== undefined)
            return {
                x: $window.pageXOffset,
                y: $window.pageYOffset
            };

        // For browsers in Standards mode
        var doc = $window.document;
        if (doc.compatMode === "CSS1Compat") {
            return {
                x: doc.documentElement.scrollLeft,
                y: doc.documentElement.scrollTop
            };
        }

        // For browsers in Quirks mode
        return {
            x: doc.body.scrollLeft,
            y: doc.body.scrollTop
        };
    }

}]);
