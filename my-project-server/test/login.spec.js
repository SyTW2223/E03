import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'
import app from '../index.js'

config()
chai.use(chaiHttp)

describe('Realizamos un login', () => {
    it('Login Correcto', (done) => {
        chai.request(app)
        .post('/api/login')
        .send({email: 'test@test.com', password: 'test'})
        .end(function(err, res) {
            chai.expect(res).to.have.status(200)
            done()
        })
    })
    it('Login Fallido, el usuario no esta creado', (done) => {
        chai.request(app)
        .post('/api/login')
        .send({email: '1', password: '2'})
        .end(function(err, res) {
            chai.expect(res).to.have.status(400)
            done()
        })
    })
    it('Login Fallido, el usuario introduce el correo mal', (done) => {
        chai.request(app)
        .post('/api/login')
        .send({email: '1', password: 'test'})
        .end(function(err, res) {
            chai.expect(res).to.have.status(400)
            done()
        })
    })
    it('Login Fallido, el usuario introduce la contraseña mal', (done) => {
        chai.request(app)
        .post('/api/login')
        .send({email: 'test@test.com', password: '2'})
        .end(function(err, res) {
            chai.expect(res).to.have.status(400)
            done()
        })
    })
})