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
* Requires: AngularJS
* Optional: Bootstrap, jQuery (for dropdown.js behavior)

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

## Questions?
####How do I contribute?
Submit an issue, fork the repo, make a pull request, @ me on [twitter @satsukitv](http://twitter.com/satsukitv), [email me](mailto:me@satsuki.tv), or subtweet [@pepitosfriend](http://twitter.com/pepitosfriend)

####You missed a gender!
I'm sorry! I make mistakes. If you want a gender to be included in this library, let me know. It'll very likely end up in here and in [satsukitv/genders](https://github.com/satsukitv/genders). You can also add genders using the API below. Let me know if you need help with that.

####There's a bug
Whoops! Make sure it's not a simple configuration/scoping issue, and then let me know in any of the above ways. I'll try to make it right. 

####Some genders seem redundant
You are free to pare down the list if you'd like! The API for that is below&mdash;it's very simple. I've included genders based on feedback from trans friends that are close to me, and knowledge from trans activists I've learned from. That being said I don't expect this module to be perfect for everyone. If it isn't meeting your needs, let me know, and I'll see how I can help.

####Isn't `<input type="text" ng-model="user.gender"/>` strictly better?
In some ways it definitely is! What this module plans to address is improving the options for gender available to users *now*, provide a simple user experience for touch screens, give developers more accurate semi-structured gender data, and giving wide user control over their gender input. Version 0.0.1 is the first step towards improving the options available by making it super simple to implement a better gender field into Angular apps. A select box or dropdown provides a great user experience for both desktop and mobile users. It also helps developers get a better idea of who is using their services. In future versions, I plan to provide a way for users to manually type their gender. You can plan for the functionality to be very similar to [my jQuery plugin](https://github.com/satsukitv/jQuery-genderField).

## Options
* `ngModel`: Bind the value of the dropdown to a javascript variable.
* `useTextField`: Default behavior is 'onOther' which shows a text field for the `<select>` functionality when "Other" is selected. Use "false" to disable the text field completely for `<select>` functionality. Use "true" to use a textbox by default. (Note: This field does not effect bootstrap functionality.)
* `selectClasses`: Applies the result of this expression to the `class` attribute of the `<select>` element if used.
* `withBootstrap`: Indicates that bootstrap.css is being used, and to use a bootstrap dropdown instead of a `<select>` element. Uses some simple built-in javascript behavior to mock dropdown.js behavior.
* `withBootstrapJs`: Same as `withBootstrap` except dropdown behavior is delegated to bootstrap.js/dropdown.js.
* `useSource`: Can either be an array, or url to a json array source file whose contents are the strings that should be used for genders. Optional if using the built-in genders from [satsukitv/genders](https://github.com/satsukitv/genders).
* `buttonId`: If you need to designate an `id` for the `<button>` used in the bootstrap template, this is where you'll do it it.
* `scrollableHeight`: Limits the height of the dropdown for bootstrap styling, and adds scrolling behavior to the dropdown.
* `useSearching`: Default (true) is to allow typing to open the dropdown and filter the options by what's been typed so far. Setting to false will disable this functionality.

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