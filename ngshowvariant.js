'use strict';

angular.module('ngshowvariant',[]);

/*
 * angular-markdown-directive v0.1.0
 * (c) 2014 Matt Van Veenendaal
 * License: MIT
 */

/**
 * A directive that shows elements only when the given variation state is in effect
 * Requires a window variable to be set using optimizely.
 * <code>
 *    <div ng-show-variant="alphabet">variant alphabet is running</div>
 *    <div ng-show-variant="cactus">variant cactus is running</div>
 *    <div ng-show-variant="cactus,alphabet">variant cactus or alphabet is running</div>
 *    <div ng-show-variant="none">No variant is enabled</div>
 *    <div ng-show-variant="cactus,none">either variant cactus or no variant is enabled</div>
 * </code>
 */

 /**
 * In optimizely, add this to 'custom javascript'
 *
 *
 * //set which variant you would like
 * window.variant= "optmizely1";
 *
 * //tell angular the variant has changed.
 * var scope = angular.element(document.getElementById('main')).injector().get('$rootScope');
 *
 * scope.$apply( function() {
 *   scope.$broadcast('$updateVariant');
 * });
 */
 angular.module('ngshowvariant').directive('ngShowVariant', ['$rootScope', function($rootScope) {
    var variant = window.variant;
    if (!variant) {
      variant = 'none';
    }
    function inList(needle, list) {
      var res = false;
      angular.forEach(list, function(x) {
        if( x === needle ) {
          res = true;
          return true;
        }
        return false;
      });
      return res;
    }
    return {
      restrict: 'A',
      compile: function(el, attr) {
        var expectingVariant = (attr.ngShowVariant||'').split(',');
        function fn(newVariant) {
          variant = newVariant;
          var hide = !inList(newVariant, expectingVariant);
          el.toggleClass('hide', hide);
        }
        fn(variant);

        $rootScope.$on('$updateVariant', function() { fn(window.variant); });
      }
    };
  }]);
