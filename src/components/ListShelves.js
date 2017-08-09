import React from 'react';
import Book from './Book';

const ListShelves = (props) => {
  return (
    <div>
      {props.shelves.map((bookshelf, index) => (
        <div key={index} className="bookshelf">
          <h2 className="bookshelf-title">{bookshelf.label}</h2>

          <div className="bookshelf-books">
            <ol className="books-grid">
              {props.library
                .filter(b => (b.shelf === bookshelf.id))
                .map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    updateShelf={props.updateShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListShelves;