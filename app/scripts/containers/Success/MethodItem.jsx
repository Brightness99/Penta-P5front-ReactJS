// @flow

import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { shouldComponentUpdate } from 'utils/helpers';
import { copyElementContentToClipboard } from 'utils/copy-util';

type Props = {
  className: string,
  type: string,
  action: Object,
  createdDate: date,
};

export class MethodItem extends React.Component {

  constructor(props) {
    super(props);

    const { action } = this.props;
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
  }

  render() {
    const { className, type, createdDate } = this.props;
    const { copied } = this.state;

    let filename = 'payment.png';
    let buttonLabel = 'ENVIAR COMPROANTE';
    let description = 'Envie para agilizar o pedido';

    if (type === 'upload') {
      buttonLabel = 'ENVIAR ARTE FINAL';
      filename = 'art.png';
      description = `Envie até as ${moment(createdDate).format('hh:mm')} do dia ${moment(createdDate).format('DD/MM/YYYY')}`;
    } else if (type === 'payment') {
      buttonLabel = 'VER BOLETO';
      filename = 'boleto.png';
      description = 'Copiar código do boleto';
    }

    return (
      <div className={cx('method-item', className)}>
        <img src={require(`assets/media/images/${filename}`)} alt="{buttonLabel}" />
        <div className="link-1">
          <a>{buttonLabel}</a>
        </div>
        <div className="link-2">
          {type === 'payment' && <div>
            <a onClick={this.copyToClipboard}>{description}</a>
            <input type="text" id="boleto-barcode" value={this.state.barcode} onChange={(e) => { this.setState({ barcode: e.target.value }); }} />
            <div className={copied ? 'clipboard-tooltip' : cx('clipboard-tooltip', 'hidden')}>
              <span>Coplado!</span>
            </div>
          </div>}
          {type !== 'payment' && <div>{description}</div>}
        </div>
      </div>
    );
  }
}

export default MethodItem;
