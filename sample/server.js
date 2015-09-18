'use strict';

var http = require('http')
var fs = require('fs');
var comprest = require('./index');

var sfunc = function(req, resp) {
  if ('/' === req.url) {
    comprest(resp).text('some text');
  }
  else if ('/json' === req.url) {
    comprest(resp).json({ a: 'un', b: 'deux', c: 'troix'});
  }
  else if ('/download' === req.url) {
    var file = fs.createReadStream('./server.js');
    comprest(resp).pipe(file);
  }
};

var server = http.createServer(sfunc);
server.listen(3000);
