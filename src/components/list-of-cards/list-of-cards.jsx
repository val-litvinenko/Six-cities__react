import React from 'react';
import {PropTypes as pt} from 'prop-types';
import CardOfPlace from '../card-of-place/card-of-place.jsx';
import {WhichPage} from './../../utils.js';

export const ListOfCards = (props) => {
  const {
    places,
    isCities,
    currentPage,
  } = props;

  return <div className={isCities ? `cities__places-list places__list tabs__content` : `near-places__list places__list`}>
    {places.map((it) => <CardOfPlace
      key={it.id}
      id={it.id}
      previewImage={it.previewImage}
      title={it.title}
      isPremium={it.isPremium}
      isFavorite={it.isFavorite}
      rating={it.rating}
      type={it.type}
      price={it.price}
      isCities={isCities}
      currentPage={currentPage}
    />)}
  </div>;
};

ListOfCards.propTypes = {
  places: pt.arrayOf(pt.shape({
    id: pt.number.isRequired,
    title: pt.string.isRequired,
    previewImage: pt.string.isRequired,
    isPremium: pt.bool,
    isFavorite: pt.bool,
    rating: pt.number,
    type: pt.string,
    price: pt.number.isRequired,
  })),
  isCities: pt.bool,
  currentPage: pt.oneOf([WhichPage.MAINPAGE, WhichPage.PAGEOFPLACE, WhichPage.FAVORITES]).isRequired,
};
