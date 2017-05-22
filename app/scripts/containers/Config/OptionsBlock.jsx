// @flow

import React from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';

import { RadioButton } from 'components/Input';

import { setViewType } from 'actions';

type Props = {
  locale: {},
  viewType?: string,
  dispatch: () => {},
};

type State = {
  format: string,
};

export default class OptionsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      format: '',
    };
  }

  static defaultProps = {
    viewType: 'gallery',
  };

  static props: Props;

  static state: State;

  handleChangeView = (ev) => {
    const { dispatch } = this.props;
    ev.preventDefault();

    dispatch(setViewType({ viewType: ev.target.value }));
  };

  renderOption(name, value, id, key) {
    const { viewType } = this.props;
    let image = null;

    //* istanbul ignore else */
    if (viewType === 'gallery') {
      image = <img src={require('assets/media/images/artnotfind.png')} alt="not-found" />;
    }

    return (
      <li key={key}>
        <label htmlFor={id}>
          {image}
          <div className="app__config__options-input">
            <RadioButton name={name} id={id} value={value} />
            85x85mm
          </div>
        </label>
      </li>
    );
  }

  render() {
    const { viewType } = this.props;

    return (
      <section className="app__config__options">
        <button value="list" onClick={this.handleChangeView}>List</button>
        <button value="gallery" onClick={this.handleChangeView}>Gallery</button>
        <ul className={cx(viewType === 'list' && 'app__config__options--show-list')}>
          <li>
            <div className="app__config__options-header">
              <h3>
                Formato
              </h3>
              <div className="app__config__options-header__youtube">
                <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
              </div>
            </div>
            <ul className="app__config__options-body">
              {[0, 1, 2, 3].map((d, i) => (
                this.renderOption('format', `format-${d}`, `item-${d}`, i)
              ))}
            </ul>
          </li>
          <li>
            <div className="app__config__options-header">
              <h3>
                Acabamento especial
              </h3>
              <div className="app__config__options-header__youtube">
                <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
              </div>
            </div>
            <ul className="app__config__options-body">
              {[4, 5, 6, 7].map((d, i) => (
                this.renderOption('finish', `finish-${d}`, `item-${d}`, i)
              ))}
            </ul>
          </li>
        </ul>
      </section>
    );
  }
}
