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
app.controller('SomeCtrl', function($scope, FileDialog) {
    $scope.saveFile = function() {
      FileDialog.saveAs(function(filename) {
        // your code
      });
    };
});
```


## API

#### fileDialog.selectFile(callback, acceptTypes)

Opens the "open file" dialog, which allows the user to choose some file.

_**callback**_ - *function* - function, which will be called if the user choose the file and clicks OK
button. Required interface: `function(files)`.

_**acceptTypes**_ - *string/array* - an array of accepted file types. See
[HTML5 specification](http://www.w3.org/TR/html-markup/input.file.html#input.file.attrs.accept).


#### fileDialog.selectFiles(callback, acceptTypes)

Opens the "open files" dialog, which allows the user to choose some file.

_**callback**_ - *function* - function, which will be called if the user choose the file and clicks OK
button. Required interface: `function(files)`.

_**acceptTypes**_ - *string/array* - an array of accepted file types. See
[HTML5 specification](http://www.w3.org/TR/html-markup/input.file.html#input.file.attrs.accept).


#### fileDialog.selectDir(callback)

Opens the "open directory" dialog, which allows the user to choose some directory.

_**callback**_ - *function* - function, which will be called if the user choose the directory and 
clicks OK button. Required interface: `function(file)`.


#### fileDialog.saveAs(callback, defaultFilename, acceptTypes)

Opens the "save as" dialog, which allows the user to input a name of the file to be saved.

_**callback**_ - *function* - function, which will be called if the user enters a name of the file to 
save and clicks OK button. Required interface: `function(file)`.

_**defaultFilename**_ - *string* - a default name of the file. Can be omitted by setting false.

_**acceptTypes**_ - *string/array* - an array of accepted file types. See
[HTML5 specification](http://www.w3.org/TR/html-markup/input.file.html#input.file.attrs.accept).


#### fileDialog.open(options, callback)

Opens dialog.

_**options**_ - *Object* - options.

_*multiple*_ - *boolean * - a flag which the user to select multiple files. Default = false.

_*accept*_ - *string/array* - an array of accepted file types.

_*webkitdirectory*_ - *boolean* - WebKit show a directory select dialog. Default = false.

_*nwdirectory*_ - *boolean* - node-webkit show a directory select dialog. Default = false.

_*nwworkingdir*_ - *string* - default directory.

_*nwsaveas*_ - *boolean/string* - open a 'save as' dialog, which lets user enter the path of a file. It's possible to select a non-existing file.

_**callback**_ - *function* - function, which will be called if the user enters a name of the file to 
save and clicks OK button. Required interface: `function(file)`.

### Important note

Please, keep in mind that there is no warranty that the callback function will be called each time
you call any of the provided methods. If the user clicks the Cancel button the callback **will not**
be called!
