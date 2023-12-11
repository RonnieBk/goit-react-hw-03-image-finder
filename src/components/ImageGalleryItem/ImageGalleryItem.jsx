import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, largeImg, tags, onClick }) => {
  return (
    <li className={css.item} onClick={() => onClick(largeImg)}>
      <img className={css.image} src={image} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string,
  largeImg: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
