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
            console.log(res.body)
            chai.expect(res).to.have.status(200)
            done()
        })
    })
})