'use strict';

var chai = require('chai'),
  chaiHttp = require('chai-http');

var expect = chai.expect;
var framework = require('../index');

var MockResponse = function() {
  this.head = { status: 0, type: null };
  this.text = "";
  this.body = {};
  this.closed = true;
};

MockResponse.prototype.writeHead = function(stat, type) {
  if (!this.closed) throw new Error('illegal second writeHead');
  this.head.status = stat;
  this.head.type = type;
  this.closed = false;
};
MockResponse.prototype.write = function(data) {
  if (this.closed) throw new Error('illegal write before writeHead');
  if (typeof data === 'string')
    this.text = data;
  else if (typeof data === 'object')
    this.body = data;
};
MockResponse.prototype.end = function() {
  if (this.closed) throw new Error('illegal end before writeHead');
  this.closed = true;
};

describe('framework', function() {
  it('should exist', function() {
    expect(typeof framework).to.eql('function');
  });
  it('should have methods', function() {
    var resp = { status: null };
    var cr = framework(resp);
    expect(typeof cr.text).to.eql('function');
    expect(typeof cr.json).to.eql('function');
    expect(typeof cr.pipe).to.eql('function');
  });
  it('should write text messages into response', function() {
    var mr = new MockResponse();
    var cr = framework(mr);
    cr.text("some text");
    expect(mr.head.status).is.eql(200);
    expect(mr.head.type).is.eql({ 'Content-Type': 'text/plain'});
    expect(mr.text).is.eql("some text");
    expect(mr.body).is.eql({});
    expect(mr.closed).is.eql(true);
  });
  it('should write object JSON into response', function() {
    var mr = new MockResponse();
    var cr = framework(mr);

    cr.json({ a: 'A', b: 'B', c: 'C' });

    expect(mr.head.status).is.eql(200);
    expect(mr.head.type).is.eql({ 'Content-Type': 'application/json'});
    expect(mr.body).is.eql({ a: 'A', b: 'B', c: 'C' });
    expect(mr.text).is.eql("");
    expect(mr.closed).is.eql(true);
  });
  it('should write non-default status values into response', function() {
    var mr = new MockResponse();
    var cr = framework(mr);
    cr.text('error message', 404);
    expect(mr.head.status).is.eql(404);
  });
});
