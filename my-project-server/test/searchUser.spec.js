import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'

let should = chai.should();

config()
chai.use(chaiHttp)

describe('Busqueda de usuarios', () => {
  let token = undefined
  let id = undefined
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
  it('Encontramos a 2 usuarios que empiezan por TEST', (done) => {
    chai.request(app)
      .get(`/api/searchUser/test`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
        res.body.should.have.property('username').lengthOf(2)
        done()
    })
  })
  it('No encontramos ningun usuario que empiece por XA', (done) => {
    chai.request(app)
      .get(`/api/searchUser/xa`)
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
        res.body.should.have.property('username').lengthOf(0)
        done()
    })
  })
})
