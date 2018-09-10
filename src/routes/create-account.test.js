const faker = require('faker')
const uuidv4 = require('uuid/v4')
const app = require('../app')
const supertest = require('supertest')

const request = supertest.agent(app)

describe('/createAccount', () => {
  describe('#POST /', () => {
    let response

    const requestBody = {
      transactionId: uuidv4(),
      apiLogin: 'mock-login',
      apiTransKey: 'mock-transaction-key',
      providerId: 'mock-provider-id',
      prodId: 'mock-prod-id',
      id: 'mock-id',
      idType: 2,
      firstName: faker.name.firstName(),
      middleName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      dateOfBirth: faker.date.past(),
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      postalCode: faker.address.zipCode(),
      countryCode: faker.address.countryCode(),
      primaryPhone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      loadType: 'RL',
      cipStatus: 2
    }

    beforeAll(async () => {
      response = await request.post('/createAccount').send(requestBody)
    })

    it('should return status 200', () => {
      expect(response.status).toBe(200)
    })

    it('should return an account created response', () => {
      expect(response.body).toEqual({
        status_code: '200',
        status: 'Success',
        response_data: {
          'new_account\\1': {
            pmt_ref_no: expect.any(Number),
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
