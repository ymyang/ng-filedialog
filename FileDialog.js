/**
 * Created by yang on 2015/9/22.
 */
angular.module('ng-fileDialog', []).factory('FileDialog', function() {

    var dialogs = {};

    dialogs.openFile = function(callback, multiple, acceptTypes) {
        _open({
            multiple: true,
            accept: acceptTypes
        }, callback);
    };

    dialogs.openDir = function(callback) {
        _open({
            nwdirectory: true
        }, callback);
    };

    dialogs.saveAs = function(callback, defaultFilename, acceptTypes) {
        _open({
            nwsaveas: defaultFilename || true,
            accept: acceptTypes
        }, callback);
    };

    function _open(options, callback) {
        var dialog = document.createElement('input');
        dialog.type = 'file';

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
            dialog.nwdirectory  = true;
        }
        if (options.nwworkingdir) {
            dialog.nwworkingdir  = options.nwworkingdir;
        }
        if (options.nwsaveas) {
            dialog.nwsaveas  = options.nwsaveas;
        }

        dialog.addEventListener('change', function() {
            // string join with ';'
            //callback(dialog.value);
            // files array
            if (options.multiple) {
                callback(dialog.files);
            } else {
                callback(dialog.files[0]);
            }
        }, false);
        dialog.click();
    }

    return dialogs;

});