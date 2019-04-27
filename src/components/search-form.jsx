import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.searchText}
        />
        <button>search</button>
      </React.Fragment>
    );
  }
}

export default SearchForm;
