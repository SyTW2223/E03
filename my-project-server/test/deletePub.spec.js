import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'

let should = chai.should();

config()
chai.use(chaiHttp)

describe('Eliminacion publicaciones', () => {
  let token = undefined
  let id = undefined
  before((done) => {
    chai.request(app)
    .post("/api/login")
    .send({email: "test@test.com", password: "test"})
    .end(function(err, res) {
      token = res.header['auth-token']
      chai.expect(res).to.have.status(200)
      chai.request(app)
    .post('/api/publication/')
    .send({username: "test", message: "Hola"})
    .auth(token, { type: 'bearer' })
    .end(function(err, res) {
      chai.expect(res).to.have.status(200)
      res.body.should.have.property('message').eql('Publicacion enviada con exito')
      res.body.should.have.property('publication').eql('Hola')
      chai.request(app)
      .get('/api/getPublications/test')
      .auth(token, { type: 'bearer' })
      .end(function(err, res) {
        id = res.body.publications[0]._id
        done()
      })
    })
    })
  })
  it("No se encuentra el usuario", (done) => {
    chai.request(app)
    .delete(`/api/deletePub/${id}`)
    .send({username: 'test3'})
    .auth(token, {type: 'bearer'})
    .end(function(err, res){
      chai.expect(res).to.have.status(400)
      res.body.should.have.property('error').eql('Usuario no encontrado')
      done()
    })
  })
  it('Eliminacion de una publicacion correctamente', (done) => {
    chai.request(app)
      .delete(`/api/deletePub/${id}`)
      .send({username: 'test'})
      .auth(token, {type: 'bearer'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
        res.body.should.have.property('message').eql("Publicación eliminada con éxito")
        done()
    })
  })
})
