# ng-fileDialog
angular file dialog for nw

## What is it

This is a simple module for node-webkit applications written with AngularJS. It provides a service 
called `fileDialog` which allows you to show the user file dialogs like "save as" or "open file".
You can find more information in the
[File dialogs](https://github.com/rogerwang/node-webkit/wiki/File-dialogs)
section of node-webkit's wiki.

This module allows you to
- Call "Save as" dialog
- Call "Open file" dialog
- Call "Open directory" dialog
- Provide filters by file types
- Allow user to select multiple files
- Specify a default name for the file


## Dependencies

1. [AngularJS](http://angularjs.org/)
2. [nw](https://github.com/nwjs/nw.js)


## Usage

1. Include the script into your HTML document after the AngularJS.
```hmtl
<script src="path/to/the/angular.js"></script>
<script src="path/to/the/ng-fileDialog.js"></script>
<script src="path/to/the/your-app-code.js"></script>
```

2. Inject `ng-fileDialog` as dependency into your module.
```js
var app = angular.module('app', ['ng-fileDialog']);
```

3. Use the provided `fileDialog` service
```js
app.controller('SomeCtrl', function($scope, fileDialog) {
    $scope.saveFile = function() {
      fileDialog.saveAs(function(filename) {
        // your code
      });
    };
});
```


## API

#### fileDialog.saveAs(callback, defaultFilename, acceptTypes)

Opens the "save as" dialog, which allows the user to input a name of the file to be saved.

_**callback**_ - *function* - function, which will be called if the user enters a name of the file to 
save and clicks OK button. Required interface: `function(file)`.

_**defaultFilename**_ - *string* - a default name of the file. Can be omitted by setting false.

_**acceptTypes**_ - *string/array* - an array of accepted file types. See
[HTML5 specification](http://www.w3.org/TR/html-markup/input.file.html#input.file.attrs.accept).


#### fileDialog.openFile(callback, multiple, acceptTypes)

Opens the "open file" dialog, which allows the user to choose some file.

_**callback**_ - *function* - function, which will be called if the user choose the file and clicks OK
button. Required interface: `function(files)`.

_**multiple**_ - *boolean* - a flag which the user to select multiple files. Default = false.

_**acceptTypes**_ - *string/array* - an array of accepted file types. See
[HTML5 specification](http://www.w3.org/TR/html-markup/input.file.html#input.file.attrs.accept).


#### fileDialog.openDir (callback)

Opens the "open directory" dialog, which allows the user to choose some directory.

_**callback**_ - *function* - function, which will be called if the user choose the directory and 
clicks OK button. Required interface: `function(file)`.


### Important note

Please, keep in mind that there is no warranty that the callback function will be called each time
you call any of the provided methods. If the user clicks the Cancel button the callback **will not**
be called!