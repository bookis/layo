#! /usr/bin/env node
"use strict";

var Layo     = require('./layo'),
 chokidar    = require('chokidar'),
 fs          = require('fs'),
 userArgs    = process.argv.slice(2);

var writeFile = function(path) {
  if (path.match(/layout/)) return;
  new Layo(userArgs[0] + "/layout.html", path).render()
    .then((file) => {
      var newFile = userArgs[1] +  path.split("/").pop();
      fs.writeFile(newFile, file);
      console.log("Wrote to " + newFile);
    });
};

chokidar.watch(userArgs[0], {ignored: /swp/}).on('change', (path) => {
  if (path.match(/layout/)) {
    fs.readdir(userArgs[0], function(err, files) {
      var i;
      files.forEach(function(file) {
        writeFile(userArgs[0] + file);
      });
    });
  } else {
    writeFile(path);
  }
})
