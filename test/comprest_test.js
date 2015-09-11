'use strict';

var chai = require('chai'),
  chaiHttp = require('chai-http');

var expect = chai.expect;
var framework = require('../index');

var mockResponse = {};
mockResponse.head = { status: 0, type: null };
mockResponse.writeHead = function(stat, type) {
  this.head.status = stat;
  this.head.type = type;
};

describe('framework', function() {
  it('should exist', function() {
    expect(framework).not.to.be.null;
  });
  it('should have useful methods', function() {
    var resp = { status: null };
    var conResp = framework(resp);
    expect(conResp.text).not.to.be.null;
  });
  it('should write text messages into response', function() {
    var conResp = framework(mockResponse);
    conResp.text("some text");
    expect(mockResponse.head.status).is.eql(200)
    expect(mockResponse.head.type).is.eql({ 'Content-Type': 'text/plain'});
  });
});
