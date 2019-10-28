const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Videos', function () {
  it('should list ALL videos on /videos GET');
  it('should add a SINGLE video on /videos POST');
});

it('should list ALL videos on /videos GET', function (done) {
  chai.request(server)
    .get('/videos')
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
});

it('should add a SINGLE video on /videos POST', function (done) {
  chai.request(server)
    .post('/videos')
    .send({ 'videoUrl': 'http://aaa.com/image', 'userId': '5dae417ac5bae8f811e998a2', 'videoName': 'My video' })
    .end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.should.have.property('message');
      res.body.data.should.be.a('object');
      res.body.data.should.have.property('_id');
      res.body.data.should.have.property('videoUrl');
      res.body.data.should.have.property('videoName');
      res.body.data.should.have.property('userId');
      res.body.message.should.equal('Success creating new video data');
      done();
    });
});

