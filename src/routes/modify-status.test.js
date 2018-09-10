const faker = require('faker')
const uuidv4 = require('uuid/v4')
const app = require('../app')
const supertest = require('supertest')

const request = supertest.agent(app)

describe('/modifyStatus', () => {
  describe('#POST /', () => {
    let response

    const requestBody = {
      transactionId: uuidv4(),
      apiLogin: 'mock-login',
      apiTransKey: 'mock-transaction-key',
      providerId: 'mock-provider-id',
      prodId: 'mock-prod-id',
      accountNo: faker.random.number(),
      type: 1
    }

    beforeAll(async () => {
      response = await request.post('/modifyStatus').send(requestBody)
    })

    it('should return status 200', () => {
      expect(response.status).toBe(200)
    })

    it('should return data', () => {
      expect(response.body).toEqual({
        status_code: '200',
        status: 'Success',
        response_data: {
          'new_account\\1': {
            pmt_ref_no: requestBody.accountNo,
            product_id: expect.any(Number),
            galileo_account_number: expect.any(Number),
            cip: expect.any(String),
            card_id: expect.any(Number),
            card_number: expect.any(String),
            expiry_date: expect.any(String),
            card_security_code: expect.any(String)
          }
        },
        processing_time: expect.any(Number),
        echo: {
          transaction_id: requestBody.transactionId,
          provider_transaction_id: expect.any(String)
        },
      })
    })
  })
})
