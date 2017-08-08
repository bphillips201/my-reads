import React, { Component } from 'react';
import Book from './Book';

class ListShelves extends Component {
  render() {

    return (
      <div>
        {this.props.shelves.map((bookshelf, index) => (
          <div key={index} className="bookshelf">
            <h2 className="bookshelf-title">{bookshelf.label}</h2>

            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.library
                  .filter(b => (b.shelf === bookshelf.id))
                  .map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateShelf={this.props.updateShelf}
                  />
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default ListShelves;