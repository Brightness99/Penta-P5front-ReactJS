// @flow

import React from 'react';
import Loading from 'components/Loading';
import TopMenuBar from '../CimpressComponents/TopMenuBar';
import SideImageBar from '../CimpressComponents/SideImageBar';
import SideTextBar from '../CimpressComponents/SideTextBar';
import CanvasToolBar from '../CimpressComponents/CanvasToolBar';
import CanvasArea from '../CimpressComponents/CanvasArea';

type Props = {
};

type State = {
  isReady: boolean,
}

export default class Canvas extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    const oStyle = document.createElement("link");
    oStyle.type = "text/css";
    oStyle.rel = "stylesheet";
    document.head.appendChild(oStyle);
    oStyle.href = '//dcl.cimpress.io/1.4.7/dcl.css';

    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.onerror = this.handleError;
    oScript.onload = this.handleLoad;
    document.body.appendChild(oScript);
    oScript.src = '//dcl.cimpress.io/1.4.7/dcl.min.js';
  }

  componentDidUpdate(prevProps, prevState) {
    const { isReady } = this.state;

    if (isReady && isReady !== prevState.isReady) {
      console.log('Initiate Cimpress global.designer');
    }
  }

  static props: Props;

  handleError = (oError) => {
    throw new URIError("The script " + oError.target.src + " is not accessible.");
  };

  handleLoad = () => {
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;

    return (
      <div className="upload__canvasSchema">
      {
        !isReady ?
        <Loading /> :
        [
          <TopMenuBar />,
          <div className="upload__canvasSchema_mainAreaContainer">
            <div className="upload__canvasSchema_sidebarContainer">
              <SideImageBar />
              <SideTextBar />
            </div>
            <div className="upload__canvasSchema_canvasContainer">
              <CanvasToolBar />
              <CanvasArea />
            </div>
          </div>,
        ]
      }
      </div>
    );
  }
}
