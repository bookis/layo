"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');

var Layo = function () {
  function Layo(layout, view) {
    _classCallCheck(this, Layo);

    this.layout = layout;
    this.view = view;
  }

  _createClass(Layo, [{
    key: "render",
    value: function render() {
      return Promise.all([this.readLayout(), this.readView()]).then(function (results) {
        return results[0].replace(/{{.+render.+}}/, results[1]);
      }).catch(function (err) {
        return err;
      });
    }
  }, {
    key: "readLayout",
    value: function readLayout() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        fs.readFile(_this.layout, "UTF8", function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  }, {
    key: "readView",
    value: function readView() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        fs.readFile(_this2.view, "UTF8", function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    }
  }]);

  return Layo;
}();

module.exports = Layo;
