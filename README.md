## CompREST
===


A productivity framework for Node.js REST applications.  Student work for class - you've been warned.

<img src=https://travis-ci.org/andrewmnelson/0913_framework.svg>

####Example
~~~javascript
var http = require('http');
var compRest = require('comprest');

var serverFunction = function(req, resp) {
  if ('/' === req.url) {
    compRest(resp).text('A sample server');
  }
  else if ('/json' === req.url) {
    var obj = { a: 'one', b: 'two' };
    compRest(resp).json(obj);
  }
  else if ('/download' === req.url) {
    var readFile = fs.createReadStream('./filename.png');
    compRest(resp).pipe(readFile);
  }
};

var server = http.createServer(serverFunction);
server.listen(3000);
~~~

####Functions

- __text(str, [status])__
  Expands to the following code:

      resp.writeHead((status? status : 200),
            {'Content-Type': 'text/plain'} );
      resp.write(str);
      resp.end();

  If status is not supplied, defaults to 200

- __json(obj, [status])__
  Expands to the following code:

      resp.writeHead((status? status : 200),
            {'Content-Type': 'application/json'} );
      resp.write(JSON.stringify(obj));
      resp.end();
  If status is not supplied, defaults to 200

- __pipe(stream, [status])__
  Expands to the following code:


      resp.writeHead((status? status : 200),
            {'Content-Type': 'text/plain'} );
      stream.pipe(resp);
  If status is not supplied, defaults to 200

