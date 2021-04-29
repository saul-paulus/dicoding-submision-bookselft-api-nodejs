const { nanoid } = require('nanoid')
const bookselft = require('./books')

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid(16)

  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  if (!name || name === '' || name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  const isFinished = (pageCount, readPage) => {
    if (pageCount === readPage) {
      return true
    } else {
      return false
    }
  }
  const finished = isFinished(pageCount, readPage)

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  bookselft.push(newBook)

  const isSuccess = bookselft.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query

  if (name) {
    const lowName = name.toLowerCase()

    const response = h.response({
      status: 'success',
      data: {
        books: bookselft
          .filter((n) => n.name === lowName)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (reading === '1') {
    const response = h.response({
      status: 'success',
      data: {
        books: bookselft
          .filter((r) => r.reading === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (reading === '0') {
    const response = h.response({
      status: 'success',
      data: {
        books: bookselft
          .filter((r) => r.reading === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (finished === '1') {
    const response = h.response({
      status: 'success',
      data: {
        books: bookselft
          .filter((f) => f.finished === true)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (finished === '0') {
    const response = h.response({
      status: 'success',
      data: {
        books: bookselft
          .filter((f) => f.finished === false)
          .map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'success',
    data: {
      books: bookselft.map((m) => ({
        id: m.id,
        name: m.name,
        publisher: m.publisher
      }))
    }
  })
  response.code(200)
  return response
}

const getByIdBooksHandler = (request, h) => {
  const { bookId } = request.params

  const book = bookselft.filter((book) => book.id === bookId)[0]
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const editBooksHandler = (request, h) => {
  const { bookId } = request.params

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  const updatedAt = new Date().toISOString()

  const index = bookselft.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    bookselft[index] = {
      ...bookselft[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBooksHandler = (request, h) => {
  const { bookId } = request.params

  const index = bookselft.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    bookselft.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getByIdBooksHandler,
  editBooksHandler,
  deleteBooksHandler
}
