/**
 * Created by yang on 2015/9/22.
 */
angular.module('ng-fileDialog', []).factory('FileDialog', function() {

    var dialogs = {};

    dialogs.selectFile = function(callback, acceptTypes) {
        _open({
            accept: acceptTypes
        }, callback);
    };

    dialogs.selectFiles = function(callback, acceptTypes) {
        _open({
            multiple: true,
            accept: acceptTypes
        }, callback);
    };

    dialogs.selectDir = function(callback) {
        _open({
            webkitdirectory: true
        }, callback);
    };

    dialogs.saveAs = function(callback, defaultFilename, acceptTypes) {
        _open({
            nwsaveas: defaultFilename || true,
            accept: acceptTypes
        }, callback);
    };

    dialogs.open = _open;

    function _open(options, callback) {
        var dialog = document.createElement('input');
        dialog.type = 'file';

        options = options || {};

        if (options.multiple) {
            dialog.multiple = true
        }
        if (options.accept) {
            if (angular.isArray(options.accept) && options.accept.length > 0) {
                dialog.accept = options.accept.join(',');
            } else if (angular.isString(options.accept)) {
                dialog.accept = options.accept;
            }
        }
        if (options.webkitdirectory) {
            dialog.webkitdirectory = true;
        }
        if (options.nwdirectory) {
            dialog.nwdirectory = true;
        }
        if (options.nwworkingdir) {
            dialog.nwworkingdir = options.nwworkingdir;
        }
        if (options.nwsaveas) {
            dialog.nwsaveas = options.nwsaveas;
        }

        dialog.addEventListener('change', function() {
            if (!callback) {
                return;
            }
            // string join with ';'
            // callback(dialog.value);
            // files array
            if (options.multiple) {
                var files = [];
                for (var i = 0; i < dialog.files.length; i++) {
                    files.push(dialog.files[i]);
                }
                callback(files);
            } else {
                callback(dialog.files[0]);
            }
        }, false);

        dialog.click();
    }

    return dialogs;

}).directive('ngFileDialog', function(FileDialog) {

    return {
        restrict: 'EA',
        replace: false,
        transclude: false,
        require: ['?options'],
        scope: {
            select: '&',
            options: '='
        },
        link: function ($scope, $element, attrs) {

            $element.on('click', function(event) {
                event.preventDefault();

                FileDialog.open($scope.options, function(file) {
                    if ($scope.select) {
                        $scope.select({
                            file: file
                        });
                    }
                });
            });

        }
    };
});