#! /usr/bin/env node
"use strict";

var Layo     = require('./layo'),
 chokidar    = require('chokidar'),
 fs          = require('fs'),
 userArgs    = process.argv.slice(2),
 src         = (userArgs[0] + "/").replace(/\{2,}/g, '/'),
 dest        = (userArgs[1] + "/").replace(/\{2,}/g, '/');

 if (!userArgs[0] || !userArgs[1]) {
   console.log("  USAGE: layo [source directory] [destination directory]");
   return false;
 }

var writeFile = function(path) {
  if (path.match(/layout/)) return;
  new Layo(src + "/layout.html", path).render()
    .then((file) => {
      var newFile = dest +  path.split("/").pop();
      fs.writeFile(newFile, file);
      console.log("Wrote to " + newFile);
    });
};

chokidar.watch(src, {ignored: /swp/}).on('change', (path) => {
  if (path.match(/layout/)) {
    fs.readdir(src, function(err, files) {
      var i;
      files.forEach(function(file) {
        writeFile(src + file);
      });
    });
  } else {
    writeFile(path);
  }
})
