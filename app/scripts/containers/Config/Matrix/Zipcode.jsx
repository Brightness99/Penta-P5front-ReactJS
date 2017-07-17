// @flow

import React from 'react';
import { MaskedInput } from 'components/Input';
import SVG from 'react-inlinesvg';
import { SuccessText } from 'atoms/Texts';

type Props = {
  locale: {},
  order: number,
  className: string,
  onZipcodeValid: () => {},
};

export default class MatrixZipcode extends React.Component {
  static props: Props;

  onValid = (zipcode: number) => {
    const { onZipcodeValid } = this.props;

    if (typeof onZipcodeValid === 'function') {
      onZipcodeValid(zipcode);
    }
  };

  render() {
    return (
      <div className="mol-matrix-zipcode">
        <h4>
          Digite seu CEP para ver os valores e a previsão de entrega
          <div className="app__config__options-header__youtube">
            <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
          </div>
        </h4>
        <div className="app__zipcode__validation">
          <MaskedInput mask="99999-999" onValid={this.onValid} />
          <SuccessText>CEP encontrado</SuccessText>
        </div>
      </div>
    );
  }
}
