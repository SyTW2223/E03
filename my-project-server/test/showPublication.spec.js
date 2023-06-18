import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'

config()
chai.use(chaiHttp)

describe('Buscamos las publicaciones de un usuario en concreto', () => {
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
  it('No encontramos al usuario', (done) => {
    chai.request(app)
      .get(`/api/getPublications/XA`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(404)
        res.body.should.have.property('error').eql('Usuario no encontrado')
        done()
    })
  })
})
