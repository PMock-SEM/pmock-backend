var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);

describe('Users', function () {
  it('should list ALL users on /users GET');
  it('should get users by id /users GET');
  it('should fail if invalid id is passed');
  it('should return user videos based in userId');
});

it('should list ALL users on /users GET', function (done) {
  chai.request(server)
    .get('/users')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
});

it('should get users by id /users GET', function (done) {
    chai.request(server)
        .get('/users/5db74a7fd56be13c6a37f338')
        .end(function (err, res) {
            res.should.have.status(200);
            assert.equal(res.body.data._id ,'5db74a7fd56be13c6a37f338');
            assert.equal(res.body.data.firstName,'Qige');
            assert.equal(res.body.data.lastName ,'Chen');
            done();
        });
 });
it('should fail if invalid id is passed',function (done) {
    chai.request(server)
        .get('/users/5db74a7fd56be13c6a399999')
    .end(function (err,res) {
        assert.equal(err,null);
        done();
    });
});
it('should return user videos based in userId',function (done) {
    chai.request(server)
        .get('/users/5db73d5b24f59e60f0e503d5/videos')
        .end(function (err,res) {
            assert.equal(res.body.data[0].userId,'5db73d5b24f59e60f0e503d5');
            done();
        });
});