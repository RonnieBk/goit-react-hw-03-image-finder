import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleModalClose = evt => {
    if (evt.target.classList.contains(css.overlay)) {
      this.props.onCloseModal();
    }
  };

  handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleModalClose}>
        <div className={css.modal}>
          <img src={this.props.largeImage} alt="Bigger version" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string,
  onCloseModal: PropTypes.func,
};
