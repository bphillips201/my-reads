import React, { Component } from 'react';
import ListBooks from './ListBooks';

class ListShelves extends Component {
  //const { shelf, title, authors } = this.props;

  state = {
    shelves: [
      {
        id: "currentlyReading",
        label: "Currently Reading"
      },
      {
        id: "wantToRead",
        label: "Want to Read"
      },
      {
        id: "read",
        label: "Read"
      }
    ]
  };
  
  render() {

    return (
      <div>
        {this.state.shelves.map((bookshelf, index) => (
          <div key={index} className="bookshelf">
            <h2 className="bookshelf-title">{bookshelf.label}</h2>

            <ListBooks
              bookData={this.props.books}
              bookshelf={bookshelf}
              updateShelf={this.props.updateShelf}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default ListShelves;