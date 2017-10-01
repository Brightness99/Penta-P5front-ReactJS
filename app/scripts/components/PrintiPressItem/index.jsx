// @flow
import React from 'react';

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

    return (
      <a href={item.url_press} className="mol-printi-press">
        <div className="atm-content-printi-press">
          <img src={require('assets/media/images/img-exame.png')} alt="Contratar" />
          <div className="qrk-text-printi-press">
            <p className="title-content">{item.image.title}</p>
            <p className="text-content">{item.title}</p>
          </div>
        </div>
      </a>
    );
  }
}
