import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: [],
    maxResults: 20
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    
    if (query.length) {
      this.searchBooks(query);
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      if (typeof(books) === 'undefined' || books.error || query.length === 0) {
        this.setState({ searchResults: [] })
      } else {
        const shelvedSearchResults = books.map((r) => {
          const result = Object.assign({}, r);
          const myBook = this.props.library.find(book => book.id === result.id);
          result.shelf = myBook ? myBook.shelf : "none";
          return result;
        });
        
        this.setState({ searchResults: shelvedSearchResults })
      }
    })
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateShelf={this.props.updateShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;