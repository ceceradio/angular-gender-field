# angular-gender-field
Directive for angular forms to allow for easy entry of gender. You're probably already storing gender as a string, so why not allow your users to tell you more?

The directive comes built-in with genders from [satsukitv/genders](https://github.com/satsukitv/genders)

[Check out the demo on jsfiddle](https://jsfiddle.net/satsukitv/mb6tmf3q/)

## How To Install

#### With Bower

`bower install angular-gender-field`

#### Manually

* [Download the repo](https://github.com/bower/bower.json-spec/archive/master.zip)
* Include gender-field.js an accessible location
* Requires:
** AngularJS
* Optional:
** Bootstrap
** jQuery (for dropdown.js behavior)

## How To Use
* Include the script in your html
```html
<script type="text/javascript" src="gender-field.js"></script>
```
* Include in your module declaration
```javascript
angular.module('myModule', ['gender-field'])
```
* Use the directive as an element. Bind the value to your model using `ngModel`.
```html
<gender-field ng-model="user.gender"></gender-field>
```

## Options
* `ngModel`: Bind the value of the dropdown to a javascript variable.
* `selectClasses`: Applies the result of this expression to the `class` attribute of the `<select>` element if used.
* `withBootstrap`: Indicates that bootstrap.css is being used, and to use a bootstrap dropdown instead of a `<select>` element.
* `withBootstrapJs`: Same as `withBootstrap` except dropdown behavior is delegated to bootstrap.js/dropdown.js.
* `useSource`: Can either be an array, or url to a json array source file whose contents are the strings that should be used for genders. Optional if using the built-in genders from [satsukitv/genders](https://github.com/satsukitv/genders).
* `buttonId`: If you need to designate an `id` for the `<button>` used in the bootstrap template, this is where you'll do it it.
* `scrollableHeight`: Limits the height of the dropdown for bootstrap styling, and adds scrolling behavior to the dropdown.

## Bootstrap Integration
The directive can integrate with bootstrap as a `<select>` field or as a bootstrap dropdown.

### `<select>` with bootstrap styling
```html
<gender-field select-classes="'form-control'"></gender-field>
```

### Without bootstrap.js/dropdown.js
```html
<gender-field with-bootstrap="true"></gender-field>
```

### With bootstrap.js
```html
<gender-field with-bootstrap-js="true"></gender-field>
```