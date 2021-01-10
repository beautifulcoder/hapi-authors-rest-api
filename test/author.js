const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')
const { after, before, describe, it } = exports.lab = Lab.script()
const { init } = require('../server')
const { connection } = require('../model')

const id = '5ff8ea833609e90fc87fee52'

const payload = {
  name: 'C R',
  email: 'xyz@abc.net',
  createdAt: '2021-01-08T06:00:00.000Z'
}

describe('/v1/authors', () => {
  let server

  it('PUT responds with 201', async () => {
    const { statusCode } = await server.inject({
      method: 'PUT',
      url: `/v1/authors/${id}`,
      payload: {...payload}
    })
    expect(statusCode).to.equal(201)
  })

  it('PUT responds with 200', async () => {
    const { statusCode } = await server.inject({
      method: 'PUT',
      url: `/v1/authors/${id}`,
      payload: {
        ...payload,
        topics: ['JavaScript', 'MongoDB']}
    })
    expect(statusCode).to.equal(200)
  })

  it('GET responds with 200', async () => {
    const { statusCode } = await server.inject({
      method: 'GET',
      url: `/v1/authors/${id}`
    })
    expect(statusCode).to.equal(200)
  })

  it('DELETE responds with 204', async () => {
    const { statusCode } = await server.inject({
      method: 'DELETE',
      url: `/v1/authors/${id}`
    })
    expect(statusCode).to.equal(204)
  })

  before(async () => {
    server = await init()
  })

  after(async () => {
    await server.stop()
    await connection.close()
  })
})
