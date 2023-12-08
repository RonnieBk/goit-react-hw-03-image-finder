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

  componentDidMount() {
    console.log('didMount');
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    this.setState({ ...INITIAL_STATE, isLoading: true });
    console.log('submit', this.state);
    this.setState({ isLoading: true });
    const form = evt.target;
    const inputValue = form.elements.input.value;
    try {
      const data = await getData(inputValue, this.state.currentPage);
      const images = await data.hits;
      this.setState({ images, query: inputValue, totalHits: data.total });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleMore = async () => {
    console.log('click', this.state);
    this.setState({ isLoading: true, error: '' });
    const { images, query, currentPage } = this.state;
    try {
      const nextImages = await getData(query, currentPage + 1);
      const newArray = images.concat(nextImages.hits);
      this.setState({
        images: newArray,
        currentPage: currentPage + 1,
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  clickImage = evt => {
    const imgUrl = evt.target.dataset.link;
    this.setState({ isModal: true, selectedImage: imgUrl });
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
