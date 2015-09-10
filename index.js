'use strict';

function ConResp(r) {
  var resp = r;
}

ConResp.prototype.text = function(str, status) {
  resp.writeHead(status? status : 200, {'Content-Type': 'text/plain'})
  // resp.write(str);
  // resp.end();
}

var framework = module.exports = exports = function(resp) {
  return new ConResp(resp);
};
