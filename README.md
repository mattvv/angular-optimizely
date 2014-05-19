# angular-optmizely
A simple directive to allow A/B testing with optimizely in angular applications.

## Usage
1. `bower install angular-optimizely`
2. Include the `ngshowvariant.js` script provided by this component into your app.
3. Add `ngshowvariant` as a module dependency to your app.
5. Insert the `ng-show-variant` directive into your template where you wish to conditionally show items.

```html
<code>
    <div ng-show-variant="alphabet">variant alphabet is running</div>
    <div ng-show-variant="cactus">variant cactus is running</div>
    <div ng-show-variant="cactus,alphabet">variant cactus or alphabet is running</div>
    <div ng-show-variant="none">No variant is enabled</div>
    <div ng-show-variant="cactus,none">either variant cactus or no variant is enabled</div>
 </code>
```

In optimizely, add custom javascript where you wish to change the variant:

```javascript
//set which variant you would like
window.variant= "optmizely1";

//tell angular the variant has changed.
var scope = angular.element(document.getElementById('main')).injector().get('$rootScope');

scope.$apply( function() {
  scope.$broadcast('$updateVariant');
});
```

## License
MIT
