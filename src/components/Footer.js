import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../App.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/drinks">
        <img src={ drinkIcon } alt="icone de bebida" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="icone de comida" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Footer;
