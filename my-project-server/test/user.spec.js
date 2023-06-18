import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'


config()
chai.use(chaiHttp)

describe('Obtenemos perfil del usuario', () => {
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
  it('No encontramos al usuario XA', (done) => {
    chai.request(app)
      .get(`/api/getUser/XA`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(404)
        res.body.should.have.property('error').eql('Usuario no encontrado')
        done()
    })
  })
  it('Encontramos al usuario', (done) => {
    chai.request(app)
      .get(`/api/getUser/test`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
        res.body.should.have.property('user').property('name').eql('test')
        res.body.should.have.property('user').property('email').eql('test@test.com')
        res.body.should.have.property('user').property('username').eql('test')
        res.body.should.have.property('user').property('follows')
        res.body.should.have.property('user').property('followers')
        res.body.should.have.property('message').eql('Usuario encontrado')
        done()
    })
  })
})
