import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'

config()
chai.use(chaiHttp)

describe('Comprobacion seguidos entre TEST y TEST2', () => {
  let token = undefined
  before((done) => {
    chai.request(process.env.URL)
    .post("/login")
    .send({email: "test@test.com", password: "test"})
    .end(function(err, res) {
      token = res.header['auth-token']
      chai.expect(res).to.have.status(200)
      done()
    })
  })
  it('Ambos usuarios no se siguen', (done) => {
    chai.request(process.env.URL)
    .post('/checkfollowing/test/test2')
    .auth(token, { type: 'bearer' })
    .end(function(err, res) {
      chai.expect(res).to.have.status(400)
      res.body.should.have.property('error').eql('Usuario sin seguir')
      done()
    })
  })
  it('No se encuentran algun usuario', (done) => {
    chai.request(process.env.URL)
    .post('/checkfollowing/test/test4')
    .auth(token, { type: 'bearer' })
    .end(function(err, res) {
      chai.expect(res).to.have.status(404)
      res.body.should.have.property('error').eql('Usuario no encontrado')
      done()
    })
  })
  it('Ambos usuarios se siguen', (done) => {
    chai.request(process.env.URL)
    .post('/following/test/test2')
    .auth(token, {type: 'bearer'})
    .end(function(err, res) {
      chai.expect(res).to.have.status(200)
      chai.request(process.env.URL)
      .post('/checkfollowing/test/test2')
      .auth(token, { type: 'bearer' })
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
        res.body.should.have.property('message').eql('Usuario siguiendo')
        chai.request(process.env.URL)
        .post('/unfollowing/test/test2')
        .auth(token, {type: 'bearer'})
        .end(function(err, res) {
          chai.expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
})