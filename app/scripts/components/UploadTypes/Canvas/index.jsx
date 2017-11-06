// @flow

import React from 'react';
import Loading from 'components/Loading';
import TopMenuBar from '../CimpressComponents/TopMenuBar';
import SideBarPanel from '../CimpressComponents/SideBarPanel';
import CanvasToolBar from '../CimpressComponents/CanvasToolBar';
import CanvasArea from '../CimpressComponents/CanvasArea';
import BottomMenuBar from '../CimpressComponents/BottomMenuBar';
import cimpressConfigBuilder from './cimpressConfigBuilder';

type Props = {
  cimpressInfo: {},
  isSku: boolean,
  handleCanvasFinalize: (docRef) => void
};

type State = {
  isReady: boolean,
  activeTab: number,
};

export default class Canvas extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isReady: false,
      activeTab: 1,
    };
  }

  componentDidMount() {
    const oStyle = document.createElement('link');
    oStyle.type = 'text/css';
    oStyle.rel = 'stylesheet';
    document.head.appendChild(oStyle);
    oStyle.href = '//dcl.cimpress.io/1.4.7/dcl.css';

    const oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.onerror = this.handleError;
    oScript.onload = this.handleLoad;
    document.body.appendChild(oScript);
    oScript.src = '//dcl.cimpress.io/1.4.7/dcl.min.js';
  }

  static props: Props;

  static state: State;

  handleOnSave = (docRef) => {
    const { handleCanvasFinalize } = this.props;

    if (handleCanvasFinalize && typeof handleCanvasFinalize === 'function') {
      handleCanvasFinalize(docRef);
    }
  };

  handleError = (oError) => {
    throw new URIError(`The script ${oError.target.src} is not accessible.`);
  };

  handleLoad = () => {
    const { cimpressInfo, isSku } = this.props;
    const config = cimpressConfigBuilder(cimpressInfo, isSku);
    global.designer.start(config)
      .then(
        () => { }
      );
    this.setState({
      isReady: true,
    });
  };

  handleSelectTab = (value) => {
    this.setState({
      activeTab: value,
    });
  };

  render() {
    const { isReady, activeTab } = this.state;
    const { cimpressInfo: { settings: { css } } } = this.props;

    return (
      <div className="upload__canvas-schema">
        {
          !isReady
            ? <Loading />
            : [
              <TopMenuBar key="top-menu-bar" handleSelectTab={this.handleSelectTab} />,
              <div className="upload__canvas-schema_main-area-container" key="upload__canvasSchema_main-area-container">
                <SideBarPanel activeTab={activeTab} />
                <div className="upload__canvas-schema_canvas-container">
                  <CanvasToolBar />
                  <CanvasArea />
                </div>
              </div>,
              <BottomMenuBar key="bottom-menu-bar" handleSave={this.handleOnSave} />,
            ]
        }
        <style>{css}</style>
      </div>
    );
  }
}
