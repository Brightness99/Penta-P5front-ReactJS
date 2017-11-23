// @flow

import React from 'react';
import { FileIcon } from 'components/Icons';

import { prePressTemplateFetch, prepressDownloadFetch } from 'actions';
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
  orientation: string,
};

export default class PrePressTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      software: '',
      orientation: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(prePressTemplateFetch());
  }

  componentWillUpdate(nextProps, nextState) {
    const { templates } = this.props;
    const { orientation } = this.state;

    console.log(Object.prototype.hasOwnProperty.call(nextProps.templates, 'options'));

    if (nextState.orientation === orientation && Object.prototype.hasOwnProperty.call(nextProps.templates, 'options') && Object.entries(templates).toString() !== Object.entries(nextProps.templates).toString()) {
      this.setState({
        orientation: Object.keys(nextProps.templates.options)[0],
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { templates: { downloadUrls } } = this.props;
    const { software, orientation } = this.state;

    if (orientation) {
      const prevLink = prevProps.templates.downloadUrls[orientation][software];

      if (prevLink !== downloadUrls[orientation][software] && !prevLink) {
        document.querySelector('.app__pre-press__download').click();
      }
    }
  }

  static props: Props;

  static state: State;

  handleOrientationSelection = (ev) => {
    this.setState({
      orientation: ev.currentTarget.value,
    });
  };

  handleDownload = (ev) => {
    if (!ev.currentTarget.href || ev.currentTarget.href === '' || ev.currentTarget.href === document.location.href) {
      ev.preventDefault();

      const { dispatch, productTitle } = this.props;
      const { orientation } = this.state;
      const software = ev.currentTarget.id;
      const fileName = `${productTitle} ${software.replace(/\b\w/g, l => l.toUpperCase())}`;

      this.setState({
        software,
      }, () => (dispatch(prepressDownloadFetch(orientation, software, fileName))));
    }
  };

  render() {
    const { templates: { options, downloadUrls, isRunning, isLoaded }, locale } = this.props;
    const { software, orientation } = this.state;

    if (isRunning || !isLoaded || orientation === '') {
      return null;
    }

    const optionsLength = Object.keys(options).length;

    return (
      <div className="app__config__warning">
        <div className="app__config__warning-block app__config__warning-block-delivery">
          <div className="app__config__warning__infos">
            <div className="app__config__warning__title">
              {locale.SUB_TITLE}
            </div>
            {optionsLength > 1 && <div className="mol-prepress-orientarion">
              <span className="atm-prepress-step">1. {locale.ORIENTATION_CHOICE}:</span>
              <div>
                {Object.keys(options).map((option) => (
                  <BoxRadio
                    key={option}
                    name={option}
                    value={option}
                    checked={option === orientation}
                    onClick={this.handleOrientationSelection}
                  >
                    {option}
                  </BoxRadio>
                ))}
              </div>
            </div>}
            <div className="mol-prepress-files">
              <span className="atm-prepress-step">{optionsLength > 1 && '2. '}{locale.SOFTWARE_CHOICE}:</span>
              <ul className="app__config__pre-press">
                {console.log('Eu só quero morrer', orientation, options, options[orientation], new Set(options[orientation]))}
                {[...new Set(options[orientation])].map((option) => (
                  <li
                    role="link"
                    key={option}
                  >
                    <a
                      className="atm-prepress-item"
                      href={downloadUrls[orientation][option]}
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
            {orientation !== '' && software !== '' &&
              <a
                className="app__pre-press__download"
                href={downloadUrls[orientation][software]}
              >
                Download
              </a>
            }
          </div>
        </div>
      </div>
    );
  }
}
