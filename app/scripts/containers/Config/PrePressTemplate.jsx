// @flow

import React from 'react';
import { FileIcon } from 'components/Icons';

import { selectPrepressOrientation, prepressDownloadFetch } from 'actions';
import { BoxRadio } from 'atoms/Inputs';

type Props = {
  locale: {},
  templates: {},
  dispatch: () => {},
  productTitle: string,
};

const extensions = {
  photoshop: 'psd',
  illustrator: 'ai',
  corel: 'cdr',
};

type State = {
  software: string,
};

export default class PrePressTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      software: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { templates: { downloadUrls, selectedOrientation } } = this.props;
    const { software } = this.state;

    const prevLink = prevProps.templates.downloadUrls[selectedOrientation][extensions[software]];

    if (prevLink !== downloadUrls[selectedOrientation][extensions[software]] && !prevLink) {
      document.querySelector('.app__pre-press__download').click();
    }
  }

  static props: Props;

  static state: State;

  handleOrientationSelection = (ev) => {
    const { dispatch } = this.props;
    dispatch(selectPrepressOrientation(ev.currentTarget.value));
  };

  handleDownload = (ev) => {
    if (!ev.currentTarget.href) {
      ev.preventDefault();

      const { dispatch, templates: { selectedOrientation }, productTitle } = this.props;
      const software = ev.currentTarget.id;
      const fileName = `${productTitle} ${software.replace(/\b\w/g, l => l.toUpperCase())}`;

      this.setState({
        software,
      }, () => (dispatch(
        prepressDownloadFetch(selectedOrientation, extensions[software], fileName)
      )));
    }
  };

  render() {
    const { templates: { options, selectedOrientation, downloadUrls } } = this.props;
    const { software } = this.state;

    return (
      <div className="app__config__warning__infos">
        <div className="app__config__warning__title">
          Baixar gabarito deste produto
        </div>
        <div className="mol-prepress-orientarion">
          <span className="atm-prepress-step">1. Escolha a orientação:</span>
          <div>
            {Object.keys(options).map((option) => (
              <BoxRadio
                key={option}
                name={option}
                value={option}
                checked={option === selectedOrientation}
                onClick={this.handleOrientationSelection}
              >
                {option}
              </BoxRadio>
            ))}
          </div>
        </div>
        <div className="mol-prepress-files">
          <span className="atm-prepress-step">2. Escolha o software:</span>
          <ul className="app__config__pre-press">
            {[...new Set(options[selectedOrientation])].map((option) => (
              <li
                role="link"
                key={option}
              >
                <a
                  className="atm-prepress-item"
                  href={downloadUrls[selectedOrientation][extensions[option]]}
                  onClick={this.handleDownload}
                  id={option}
                >
                  <FileIcon />
                  <span>{extensions[option].toUpperCase()}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="app__config__warning__text">
          Precisa de ajuda? Clique aqui
        </div>
        <a
          className="app__pre-press__download"
          href={downloadUrls[selectedOrientation][extensions[software]]}
        >
          Download
        </a>
      </div>
    );
  }
}
