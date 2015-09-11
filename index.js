'use strict';

function CompRest(r) {
  this.resp = r;
}

CompRest.prototype.text = function(str, status) {
  this.resp.writeHead((status? status : 200), {'Content-Type': 'text/plain'});
  this.resp.write(str);
  this.resp.end();
};

CompRest.prototype.json = function(obj, status) {
  this.resp.writeHead((status? status : 200), {'Content-Type': 'application/json'});
  this.resp.write(obj);
  this.resp.end();
};

CompRest.prototype.pipe = function(stream, status) {
  this.resp.writeHead((status? status : 200), {'Content-Type': 'text/plain'});
  stream.pipe(this.resp);
};

var framework = module.exports = exports = function(rsp) {
  return new CompRest(rsp);
};
