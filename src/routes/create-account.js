const faker = require('faker')
const moment = require('moment')
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  const { transactionId } = req.body

  res.json({
    status_code: '200',
    status: 'Success',
    response_data: {
      'new_account\\1': {
        pmt_ref_no: faker.random.number(),
        product_id: faker.random.number(),
        galileo_account_number: faker.random.number(),
        cip: faker.random.alphaNumeric(8),
        card_id: faker.random.number(),
        card_number: faker.finance.creditCardNumber(),
        expiry_date: moment().add(1, 'year').format('MM/YYYY'),
        card_security_code: faker.finance.creditCardCVV()
      }
    },
    processing_time: faker.random.number(),
    echo: {
      transaction_id: transactionId,
      provider_transaction_id: faker.random.alphaNumeric(8)
    }
  })
})

module.exports = router
