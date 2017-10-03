// @flow
import React from 'react';
import config from 'config';

type Props={
  item: {
    url_press: string,
    title: string,
    image: {
      title: string,
      file: string,
    }
  }
}

export class PrintiPressItem extends React.PureComponent {
  props: Props;

  render() {
    const { item } = this.props;
    const url = config.basePath + 'files/' + item.image.file;
    return (
      <a href={item.url_press} className="mol-printi-press">
        <div className="atm-content-printi-press">
          <img src={url} alt="Contratar" />
          <div className="qrk-text-printi-press">
            <p className="title-content">{item.image.title}</p>
            <p className="text-content">{item.title}</p>
          </div>
        </div>
      </a>
    );
  }
}
