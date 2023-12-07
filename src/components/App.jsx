import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import getData from '../api.js';
import '../index.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: '',
    currentPage: 1,
  };

  componentDidMount() {
    console.log('didMount');
  }

  // componentDidUpdate() {}

  handleSubmit = async evt => {
    evt.preventDefault();
    const form = evt.target;
    const inputValue = form.elements.input.value;
    try {
      const images = await getData(inputValue, this.currentPage);
      this.setState({ images });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery data={this.state.images} />
      </div>
    );
  }
}
