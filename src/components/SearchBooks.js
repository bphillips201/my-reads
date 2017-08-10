import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query });
    this.searchBooks(query);
  }

  searchBooks = (query) => {
    if (query.length) {
      BooksAPI.search(query, 20).then((books) => {
        if (typeof(books) === 'undefined' || books.error) {
          this.setState({ searchResults: [] })
        } else {
          this.setState({ searchResults: books })
        }
      })
    } else {
      this.setState({ searchResults: [] })     
    }
  }

  render() {

    /*
     * Display appropriate shelf for each book in searchResults
     */
    const shelvedSearchResults = this.state.searchResults.map((r) => {
      const result = Object.assign({}, r);
      const myBook = this.props.library.find(book => book.id === result.id);
      result.shelf = myBook ? myBook.shelf : "none";
      return result;
    });

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
            {shelvedSearchResults.map((book) => (
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