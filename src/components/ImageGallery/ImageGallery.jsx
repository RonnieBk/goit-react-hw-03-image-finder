import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  render() {
    const { data } = this.props;
    return (
      <ul className={css.list}>
        {data.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
              onClick={this.props.onClick}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};
