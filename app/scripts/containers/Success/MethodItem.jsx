// @flow

import React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate } from 'utils/helpers';
import { copyElementContentToClipboard } from 'utils/copy-util';

type Props = {
  className: string,
  type: string,
  action: Object,
};

export class MethodItem extends React.Component {

  constructor(props) {
    super(props);

    const { action } = props;
    this.state = {
      barcode: action.boleto && action.boleto.barcode,
      copied: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;
  static props: Props;

  copyToClipboard = () => {
    copyElementContentToClipboard('boleto-barcode');
    this.setState({
      copied: true,
    });
  };

  render() {
    const { className, type } = this.props;
    const { copied } = this.state;

    let filename = 'payment.png';
    let buttonLabel = 'ENVIAR COMPROANTE';

    if (type === 'upload') {
      buttonLabel = 'ENVIAR ARTE FINAL';
      filename = 'art.png';
    } else if (type === 'payment') {
      buttonLabel = 'VER BOLETO';
      filename = 'boleto.png';
    }

    return (
      <div className={cx('method-item', className)}>
        <img src={require(`assets/media/images/${filename}`)} alt="{buttonLabel}" />
        <div className="link-1">
          <a>{buttonLabel}</a>
        </div>
        <div className="link-2">
          {type === 'payment' && <div>
            <a onClick={this.copyToClipboard}>
              Copiar código do boleto
              <div className={cx('clipboard-tooltip', !copied && 'hidden')}>
                <span>Copiado!</span>
              </div>
            </a>
            <input type="text" id="boleto-barcode" value={this.state.barcode} onChange={(e) => { this.setState({ barcode: e.target.value }); }} />
          </div>}
        </div>
      </div>
    );
  }
}

export default MethodItem;
