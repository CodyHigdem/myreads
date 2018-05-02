import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks.js';

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
    query: '',
    allBooks: [],
  }

  updateQuery = (query) => {
    this.setState(() => ({
        query: query.trim()
    }))
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
                myBooks: books,
                allBooks: books
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
    const changeShelf = (book, shelf) =>{
      this.updateBook(book, shelf);
    }

    const showingBooks = this.state.allBooks
    
    /*this.state.query === ''
    ? this.state.allBooks
    : BooksAPI.search(this.state.query);
*/
    console.log(showingBooks);

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}


                {showingBooks.length !== this.state.myBooks.length && (
                    <div className="showing-contacts">
                        <span> Now showing {showingBooks.length} of {this.state.myBooks.length}</span>
                        <button
                            onClick={this.clearQuery}
                        > show all </button>
                    </div>
                )}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event)=> this.updateQuery(event.target.value)}  
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
            <h1> book count:   
              {showingBooks.length}
              </h1>
              </ol>
            </div>
          </div>
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
