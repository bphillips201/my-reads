import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from './ListBooks';

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
        this.setState({ searchResults: books })
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={this.state.query} placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>
            
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            searchResults={this.state.searchResults}
            library={this.props.library}
            shelf={null}
            updateShelf={this.props.updateShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks;