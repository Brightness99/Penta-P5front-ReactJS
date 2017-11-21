// @flow

import React from 'react';

type State = {
  width: number,
}

export default class CanvasArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  componentDidMount() {
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setWidth);
  }

  setWidth = () => {
    const width = this.canvasContainer.clientWidth;
    this.setState({ width });
  };

  state: State;

  render() {
    const { width } = this.state;
    const styles = { width };
    return (
      <section
        className="upload__canvas-schema__canvas-area"
        ref={(section) => { this.canvasContainer = section; }}
      >
        <div
          id="canvases"
          className="upload__canvas-schema__canvas-area__canvases"
          style={styles}
        />
      </section>
    );
  }
}
