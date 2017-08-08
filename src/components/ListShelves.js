import React, { Component } from 'react';
import ListBooks from './ListBooks';

class ListShelves extends Component {
  render() {

    return (
      <div>
        {this.props.shelves.map((bookshelf, index) => (
          <div key={index} className="bookshelf">
            <h2 className="bookshelf-title">{bookshelf.label}</h2>

            <div className="bookshelf-books">
              <ListBooks
                library={this.props.library}
                shelf={bookshelf.id}
                updateShelf={this.props.updateShelf}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default ListShelves;