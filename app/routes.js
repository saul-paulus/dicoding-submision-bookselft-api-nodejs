const {
  addBooksHandler,
  getAllBooksHandler,
  getByIdBooksHandler,
  editBooksHandler,
  deleteBooksHandler
} = require('./handler')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return 'ini halaman home'
    }
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getByIdBooksHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooksHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksHandler
  }
]

module.exports = routes
