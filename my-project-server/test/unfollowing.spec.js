import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'

config()
chai.use(chaiHttp)

describe('Test para realizar unfollowing', () => {
  let token = undefined
  before((done) => {
    chai.request(app)
    .post("/api/login")
    .send({email: "test@test.com", password: "test"})
    .end(function(err, res) {
      token = res.header['auth-token']
      chai.expect(res).to.have.status(200)
      done()
    })
  })
  it('No encontramos a un usuario para dejarlo de seguir', (done) => {
    chai.request(app)
      .post(`/api/unfollowing/test/XA`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(400)
        res.body.should.have.property('error').eql('Usuario no encontrado')
        done()
    })
  })
  it('Los usuarios no se siguen', (done) => {
    chai.request(app)
      .post(`/api/unfollowing/test/test2`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(400)
        res.body.should.have.property('error').eql('Usuario no siguiendo')
        done()
    })
  })
})
