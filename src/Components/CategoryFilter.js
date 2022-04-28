import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchCategories from '../Service/fetchCategories';
import fetchFilteredByCategory from '../Service/fetchFilteredByCategory';
import AppContext from '../context/AppContext';
import fetchFoods from '../Service/fetchFoods';
import fetchDrinks from '../Service/fetchDrinks';

export default function CategoryFilter(props) {
  const {
    type,
  } = props;
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const {
    setFoods,
    setDrinks,
  } = useContext(AppContext);

  const handleFilter = ({ target }) => {
    if (activeFilter === '') {
      setActiveFilter(target.value);
    } else if (activeFilter === target.value) {
      setActiveFilter('');
    } else {
      setActiveFilter(target.value);
    }
  };

  const renderizeFiltered = async () => {
    if (activeFilter === '') {
      if (type === 'foods') {
        const foodsResult = await fetchFoods();
        setFoods(foodsResult);
      } else {
        const drinksResult = await fetchDrinks();
        setDrinks(drinksResult);
      }
    }
    if (activeFilter !== '') {
      const fetchResult = await fetchFilteredByCategory(type, activeFilter);
      if (type === 'foods') {
        setFoods(fetchResult);
      } else {
        setDrinks(fetchResult);
      }
    }
  };

  useEffect(() => {
    renderizeFiltered();
  }, [activeFilter]);

  const getCategories = async () => {
    const fetchResult = await fetchCategories(type);
    const position = 0;
    const position2 = 5;
    const sliced = fetchResult.slice(position, position2);
    setCategories(sliced);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        value="All"
        onClick={ handleFilter }
      >
        All
      </button>
      {
        categories.map((e, i) => (
          <button
            key={ i }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            value={ e.strCategory }
            onClick={ handleFilter }
          >
            { e.strCategory }
          </button>
        ))
      }
    </div>
  );
}

CategoryFilter.propTypes = {
  type: PropTypes.string.isRequired,
};