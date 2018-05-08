import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookItem from './BookItem';
import * as BooksAPI from '../BooksAPI';

class BookSearch extends Component{
    static propTypes = {
        myBooks: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    state = {
        books: [],
        query: '',
    }

    updateQuery = (query) => {
        this.setState(()=> {
            return {query}
        })
        this.searchBooks(query);
    }

    searchBooks = (val) => {
        if (val.length !== 0) {
          BooksAPI.search(val)
            .then((books) => {
              if(books.error){
                  console.log('yo undefined');
                  this.setState({books: []})
              }
        if (books.length !== undefined) {
              books = books.filter((book) => (book.imageLinks))

              //console.log(books);
              books = this.changeBookShelf(books)
              this.setState(() => {
                return {books}
              })
            }
          })
        }
      }

      changeShelf = (book, shelf) =>{
        this.props.updateBook(book, shelf);
      }

// Like this version of change shelf better so modified my setup to look more like it =>
// https://github.com/sagarchoudhary96/My-Reads/blob/master/src/Components/Book_Search.js
      changeBookShelf = (books) => {
        let myBooks = this.props.myBooks
        for (let book of books) {
          book.shelf = "none"
        }
    
        for (let book of books) {
          for (let myBook of myBooks) {
            
            if (myBook.id === book.id) {
              book.shelf = myBook.shelf
            }
          }
        }
        return books
      }
    clearQuery = () => {
        this.updateQuery('');
    }

    render(){
        return (
          <div className="search-books">
            <div className="search-books-bar">
                <Link 
                    to="/"
                    className="close-search"
                >Close</Link>
              
              
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event)=> this.updateQuery(event.target.value)}  
                />
              </div>
            </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Search Results</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                {this.state.query.length > 0 && this.state.books.map((book, index) => (
                    <BookItem 
                        book={book} 
                        key={index} 
                        updateBook={this.changeShelf}
                    />))
                }
                    </ol>
                  </div>
                </div>
          </div>
        );
    }
}

export default BookSearch;