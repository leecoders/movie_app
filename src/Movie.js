import React from 'react';
import PropTypes from 'prop-types';

function Movie({id, year, title, summary, poster}) {
    return (
        <h4>{title}</h4>
    )
}

Movie.propTypes = {
    id : PropTypes.number,
    year : PropTypes.number,
    title : PropTypes.string,
    summary : PropTypes.string,
    poster : PropTypes.string
};

export default Movie;