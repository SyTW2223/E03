import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'

let should = chai.should();

config()
chai.use(chaiHttp)

describe('Obtenemos todas las publicaciones del usuario TEST', () => {
  let token = undefined
  beforeEach((done) => {
    chai.request(app)
    .post("/api/login")
    .send({email: "test@test.com", password: "test"})
    .end(function(err, res) {
      token = res.header['auth-token']
      chai.expect(res).to.have.status(200)
      done()
    })
  })
  it('Obtenemos las publicaciones correctamente', (done) => {
    chai.request(app)
      .get('/api/getAllPublications/test')
      .auth(token, { type: 'bearer' })
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
          res.body.should.have.property('message').eql('Publicaciones de los usuarios seguidos')
          res.body.should.have.property('publications')
          done()
        })
    })
  it('No encontramos al usuario', (done) => {
    chai.request(app)
    .get('/api/getAllPublications/test4')
    .auth(token, { type: 'bearer' })
    .end(function(err, res) {
      chai.expect(res).to.have.status(404)
      res.body.should.have.property('error')
      done()
    })
  })
})