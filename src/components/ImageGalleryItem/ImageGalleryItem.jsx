import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, largeImg, tags }) => {
  return (
    <li className={css.item}>
      <img src={image} alt={tags} />
    </li>
  );
};
