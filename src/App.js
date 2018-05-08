import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks.js';
import BookSearch from './components/BookSearch';

class BooksApp extends React.Component {
  state = {
    myBooks: [ ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
  }

  clearQuery = () => {
    this.updateQuery('');
  }

  searchBooks = (query) => {
    const bookList = BooksAPI.search(query);
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
            this.setState(()=>({
                myBooks: books
            }))
        })
/*
    BooksAPI.search()
        .then((books) => {
          console.log(books)
        })
*/

  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book,shelf)
      .then((book) => {
        BooksAPI.getAll()
        .then((books) => {
            this.setState(()=>({
                myBooks: books
            }))
        })
      })
  }

  render() {
    const changeShelf = (book, shelf) =>{
      this.updateBook(book, shelf);
    }

    const showingBooks = this.state.allBooks
    
    /*this.state.query === ''
    ? this.state.allBooks
    : BooksAPI.search(this.state.query);
*/

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch 
            updateBook={this.updateBook}
            myBooks={this.state.myBooks}
            />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBooks 
              books={this.state.myBooks}
              updateBook={this.updateBook}
            />

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
