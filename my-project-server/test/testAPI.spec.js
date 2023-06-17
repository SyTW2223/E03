import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'


chai.use(chaiHttp)
const url = 'http://localhost:8080/api'

describe('Realizamos un login', () => {
    it('Login Correcto', (done) => {
        chai.request(url)
        .post('/login')
        .send({email: '1', password: '1'})
        .end(function(err, res) {
            chai.expect(res).to.have.status(200)
            done()
        })
    })
    it('Login Fallido', (done) => {
        chai.request(url)
        .post('/login')
        .send({email: '1', password: '2'})
        .end(function(err, res) {
            chai.expect(res).to.have.status(400)
            done()
        })
    })
})