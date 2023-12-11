import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import getData from '../api.js';
import '../index.css';
import { Modal } from './Modal/Modal';

const INITIAL_STATE = {
  images: [],
  totalHits: 0,
  query: '',
  isLoading: false,
  error: '',
  currentPage: 1,
  isModal: false,
  selectedImage: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  shouldComponentUpdate(_, nextState) {
    if (
      nextState.query !== this.state.query ||
      nextState.currentPage !== this.state.currentPage ||
      nextState.isModal !== this.state.isModal
    ) {
      return true;
    }
    return false;
  }

  fetchImages = async (query, page) => {
    this.setState({ isLoading: true, error: '' });
    try {
      const data = await getData(query, page);
      return data;
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = async evt => {
    evt.preventDefault();

    const form = evt.target;
    const query = form.elements.input.value;
    const data = await this.fetchImages(query, 1);
    const images = data.hits;

    this.setState({ images, query, totalHits: data.total, currentPage: 1 });
  };

  handleMore = async () => {
    const { images, query, currentPage } = this.state;
    const nextImages = await this.fetchImages(query, currentPage + 1);
    this.setState({
      images: [...images, ...nextImages.hits],
      currentPage: currentPage + 1,
    });
  };

  clickImage = largeImgUrl => {
    this.setState({ isModal: true, selectedImage: largeImgUrl });
  };

  closeModal = () => {
    this.setState({ isModal: false, selectedImage: '' });
  };

  render() {
    const {
      isLoading,
      images,
      isModal,
      selectedImage,
      totalHits,
      currentPage,
    } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery data={images} onClick={this.clickImage} />
        {isModal && (
          <Modal largeImage={selectedImage} onCloseModal={this.closeModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && totalHits > currentPage * 12 && (
          <Button onClick={this.handleMore} />
        )}
      </div>
    );
  }
}
