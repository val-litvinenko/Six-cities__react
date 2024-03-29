import React from "react";
import {PropTypes as pt} from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator as DataActionCreator, Operation as DataOperation} from '../../reducer/data/reducer.js';
import {getFetching} from './../../reducer/data/selector.js';
import {RatingInt, MIN_COMMENT_LENGTH} from './../../utils.js';

export const CommentForm = (props) => {
  const {
    isFetching,
    id,
    onSendReview,
    onChangeFetching,
    rating,
    comment,
    onChangeRating,
    onChangeComment,
  } = props;

  return <form className="reviews__form form" action="#" method="post">
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" checked={rating === RatingInt.FIVE ? true : false }
        onChange={() => {
          onChangeRating(RatingInt.FIVE);
        }
        }/>
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" checked={rating === RatingInt.FOUR ? true : false }
        onChange={() => {
          onChangeRating(RatingInt.FOUR);
        }
        }/>
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" checked={rating === RatingInt.THREE ? true : false }
        onChange={() => {
          onChangeRating(RatingInt.THREE);
        }
        }/>
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" checked={rating === RatingInt.TWO ? true : false }
        onChange={() => {
          onChangeRating(RatingInt.TWO);
        }
        }/>
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" checked={rating === RatingInt.ONE ? true : false }
        onChange={() => {
          onChangeRating(RatingInt.ONE);
        }
        }/>
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </div>
    <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" maxLength="300"
      value={comment} onChange={(evt) => {
        onChangeComment(evt.target.value);
      }} disabled={isFetching}></textarea>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={checkForm(comment, rating, isFetching)} onClick={(evt) => {
        evt.preventDefault();
        onChangeFetching(true);
        onSendReview({
          rating,
          comment,
        }, id);
        onChangeComment(``);
        onChangeRating(0);
      }
      }>Submit</button>
    </div>
  </form>;
};

const checkForm = (comment, rating, isFetching) => comment.length < MIN_COMMENT_LENGTH || rating === RatingInt.NONE || isFetching;

CommentForm.propTypes = {
  id: pt.number,
  onSendReview: pt.func,
  onChangeFetching: pt.func,
  isFetching: pt.bool,
  rating: pt.number.isRequired,
  comment: pt.string.isRequired,
  onChangeRating: pt.func,
  onChangeComment: pt.func,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isFetching: getFetching(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFetching: (status) => {
    dispatch(DataActionCreator.onChangeFetching(status));
  },
  onSendReview: (review, id) => {
    dispatch(DataOperation.onSendReview(review, id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
