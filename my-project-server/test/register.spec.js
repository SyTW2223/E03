import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'

config()
chai.use(chaiHttp)

// describe('Realizamos un register', () => {
//     it('Login Correcto', (done) => {
//         chai.request(process.env.URL)
//         .post('/register')
//         .send({email: 'test1@test.com', password: 'test'})
//         .end(function(err, res) {
//             chai.expect(res).to.have.status(200)
//             done()
//         })
//     })
//     it('Login Fallido, el usuario no esta creado', (done) => {
//         chai.request(process.env.URL)
//         .post('/login')
//         .send({email: '1', password: '2'})
//         .end(function(err, res) {
//             chai.expect(res).to.have.status(400)
//             done()
//         })
//     })
//     it('Login Fallido, el usuario introduce el correo mal', (done) => {
//         chai.request(process.env.URL)
//         .post('/login')
//         .send({email: '1', password: 'test'})
//         .end(function(err, res) {
//             chai.expect(res).to.have.status(400)
//             done()
//         })
//     })
//     it('Login Fallido, el usuario introduce la contraseña mal', (done) => {
//         chai.request(process.env.URL)
//         .post('/login')
//         .send({email: 'test@test.com', password: '2'})
//         .end(function(err, res) {
//             chai.expect(res).to.have.status(400)
//             done()
//         })
//     })
// })