var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function () {
  it('should list ALL users on /users GET');
});

it('should list ALL users on /users GET', function (done) {
  chai.request(server)
    .get('/users')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
});
