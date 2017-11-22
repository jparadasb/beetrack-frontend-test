import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

require('./styles.scss');

const SearchBox = props => (
  <section
    className="search-box"
  >
    <label
      htmlFor="searchBox"
    >
      <FontAwesome
        name="search"
        className="icon"
      />
      <input
        type="text"
        id="searchBox"
        className="input"
        placeholder="Buscar contacto..."
        onChange={event => props.onChange(event.target.value)}
      />
    </label>
  </section>
);

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SearchBox;
