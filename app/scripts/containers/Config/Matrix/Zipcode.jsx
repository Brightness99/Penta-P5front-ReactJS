// @flow

import React from 'react';
import { MaskedInput } from 'components/Input';
import SVG from 'react-inlinesvg';
import { SuccessText, ErrorText } from 'atoms/Texts';

type Props = {
  locale: {},
  order: number,
  className: string,
  defaultValue: string,
  onZipcodeValid: () => {},
  onReset: () => {},
  isZipcodeValid: boolean,
  errorMessage: string,
};

type State = {
  isCompleted: boolean,
};

export default class MatrixZipcode extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      isCompleted: false,
    };
  }

  static props: Props;

  static state: State;

  onValid = (zipcode: number) => {
    const { onZipcodeValid } = this.props;

    this.setState({
      isCompleted: true,
    });

    if (typeof onZipcodeValid === 'function') {
      onZipcodeValid(zipcode);
    }
  };

  onUncompleted = (isCompleted) => {
    if (!isCompleted) {
      this.setState({
        isCompleted: false,
      });
    }
  };

  renderValidation() {
    const { defaultValue, isZipcodeValid, errorMessage } = this.props;
    const { isCompleted } = this.state;

    if (defaultValue === '' || !isCompleted) {
      return null;
    }

    if (isZipcodeValid) {
      return <SuccessText>CEP encontrado</SuccessText>;
    }

    return <ErrorText>{errorMessage}</ErrorText>;
  }

  render() {
    const { defaultValue, onReset } = this.props;
    return (
      <div className="mol-matrix-zipcode">
        <h4>
          Digite seu CEP para ver os valores e a previsão de entrega
          <div className="app__config__options-header__youtube">
            <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
          </div>
        </h4>
        <div className="app__zipcode__validation">
          <MaskedInput
            mask="99999-999"
            onValid={this.onValid}
            checkCompleted={this.onUncompleted}
            defaultValue={defaultValue}
            onReset={onReset}
          />
          {this.renderValidation()}
        </div>
      </div>
    );
  }
}
