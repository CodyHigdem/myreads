import React, { Component} from 'react';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';

import BookItem from './BookItem';
import * as BooksAPI from '../BooksAPI'

class BookSearch extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    state = {
        Books: [],
        query: ''
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
                  this.setState({Books: []})
              }
        if (books.length != undefined) {
              books = books.filter((book) => (book.imageLinks))
              books = this.changeBookShelf(books)
              this.setState(() => {
                return {Books: books}
              })
            }
          })
        }
      }

      changeBookShelf = (books) => {
        for (let book of books) {
          book.shelf = "none"
        }
        return books
      }
      add_book = (book, shelf) => {
        this.props.updateBook(book, shelf)
      }
    clearQuery = () => {
        this.updateQuery('');
    }



    render(){

        const { books, updateBook } = this.props;

        return (
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


                {(
                    <div className="showing-contacts">
                        <span> Now showing {books.length}</span>
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
                {this.state.query.length > 0 && this.state.Books.map((book, index) => (
                    <BookItem 
                        book={book} 
                        key={index} 
                        onUpdate={(shelf) => {
                            this.add_book(book, shelf)
                        }}
                    />))
                }
              </ol>
            </div>
          </div>
        );
    }
}




export default BookSearch;