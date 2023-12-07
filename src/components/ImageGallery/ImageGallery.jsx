import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  render() {
    const { data } = this.props;
    return (
      <ul className={css.list}>
        {data.map(item => {
          const { id, webformatURL, largeImageURL, tags } = item;
          return (
            <ImageGalleryItem
              key={id}
              image={webformatURL}
              largeImg={largeImageURL}
              tags={tags}
            />
          );
        })}
      </ul>
    );
  }
}
