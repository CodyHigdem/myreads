import React from 'react'
import { Route, Link } from 'react-router-dom';

/* LOCAL */
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
  }

  clearQuery = () => {
    this.updateQuery('');
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
            this.setState(()=>({
                myBooks: books
            }))
        })

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
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBooks 
              books={this.state.myBooks}
              updateBook={this.updateBook}
            />

            <div className="open-search">


              <Link 
                to="/search"
              >Add a book </Link>
            </div>
            </div>
          )} 
        />

      <Route path='/search' render={({ history}) => (
        <BookSearch 
          updateBook={this.updateBook}
          myBooks={this.state.myBooks}
          />
        )} 
      />
      </div>
    )
  }
}

export default BooksApp
