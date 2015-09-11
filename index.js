'use strict';

function ConResp(r) {
  this.resp = r;
}

ConResp.prototype.text = function(str, status) {
  this.resp.writeHead((status? status : 200), {'Content-Type': 'text/plain'})
  // resp.write(str);
  // resp.end();
}

var framework = module.exports = exports = function(rsp) {
  return new ConResp(rsp);
};
