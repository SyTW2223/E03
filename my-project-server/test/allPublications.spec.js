import "mocha"
import chai from 'chai'
import chaiHttp from 'chai-http'
import { config } from 'dotenv'

config()
chai.use(chaiHttp)

describe('Obtenemos todas las publicaciones del usuario TEST', () => {
  it('Obtenemos las publicaciones correctamente', (done) => {
    chai.request(process.env.URL)
      .post('/login')
      .send({email: 'test@test.com', password: 'test'})
      .end(function(err, res) {
        chai.expect(res).to.have.status(200)
        chai.request(process.env.URL)
        .get('/getAllPublications/test')
        .auth(res.header['auth-token'], { type: 'bearer' })
        .end(function(err, res) {
          chai.expect(res).to.have.status(200)
          done()
        })
      })
  })
})