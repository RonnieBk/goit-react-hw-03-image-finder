import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.props.onSubmit}>
          <button type="submit" className={css.searchBtn}></button>

          <input
            className={css.input}
            name="input"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
