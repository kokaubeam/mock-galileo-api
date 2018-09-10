const app = require('../app')
const supertest = require('supertest')

const request = supertest.agent(app)

describe('/health', () => {
  describe('#GET /', () => {
    let response

    beforeAll(async () => {
      response = await request.get('/health')
    })

    it('should return status 200', () => {
      expect(response.status).toBe(200)
    })
  })
})
