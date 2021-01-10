const db = require('../model')

exports.details = async (request, h) => {
  const author = await db.Author.findById(request.params.id).exec()
  request.log(['implementation'], `GET 200 /v1/authors ${author}`)
  return h.response(author.toObject())
}

exports.upsert = async (request, h) => {
  const author = await db.Author.findById(request.params.id).exec()

  if (!author) {
    const newAuthor = new db.Author(request.payload)
    newAuthor._id = request.params.id
    await newAuthor.save()
    request.log(['implementation'], `PUT 201 /v1/authors ${newAuthor}`)
    return h
      .response(newAuthor.toObject())
      .created(`/v1/authors/${request.params.id}`)
  }

  author.name = request.payload.name
  author.email = request.payload.email
  author.topics = request.payload.topics
  request.log(['implementation'], `PUT 200 /v1/authors ${author}`)
  await author.save()
  return h.response(author.toObject())
}

exports.delete = async (request, h) => {
  await db.Author.findByIdAndDelete(request.params.id)
  request.log(
    ['implementation'],
    `DELETE 204 /v1/authors ${request.params.id}`)
  return h.response().code(204)
}
