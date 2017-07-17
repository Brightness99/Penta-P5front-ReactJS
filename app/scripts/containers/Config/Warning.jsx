// @flow

import React from 'react';
import { vsprintf } from 'sprintf-js';

import { CalendarIcon, HelpIcon } from 'components/Icons';
import { BoxRadio } from 'atoms/Inputs';
import PrePressTemplate from './PrePressTemplate';

type Props = {
  locale: {},
  templates: {},
};

const art_text = 'A arte deve ser enviada até %s %s às %s. Após esse período a data para a previsão de entrega será alterada.';

export default class Warning extends React.Component {
  static props: Props;

  render() {
    const { templates: { options, selectedOption } } = this.props;
    return (
      <div className="app__config__warning">
        <div className="app__config__warning-block app__config__warning-block-delivery">
          <div className="app__config__warning__logo"><CalendarIcon /></div>
          <div className="app__config__warning__infos">
            <div className="app__config__warning__title">
              Prazo de entrega
            </div>
            <div className="app__config__warning__text">
              {vsprintf(art_text, ['terça', '24/11/16', '14:00'])}
            </div>
          </div>
        </div>
        <div className="app__config__warning-block app__config__warning-block-template">
          <div className="app__config__warning__logo"><HelpIcon /></div>
          <div className="app__config__warning__infos">
            <div className="app__config__warning__title">
              Baixar gabarito deste produto
            </div>
            <div className="mol-prepress-orientarion">
              <span className="atm-prepress-step">1. Escolha a orientação:</span>
              <div>
                {Object.keys(options).map((option, i) => (
                  <BoxRadio
                    name={option}
                    value={option}
                    checked={option === selectedOption}
                  >
                    {option}
                  </BoxRadio>
                ))}
              </div>
            </div>
            <div className="mol-prepress-files">
              <span className="atm-prepress-step">2. Escolha o software:</span>
              <PrePressTemplate />
            </div>
            <div className="app__config__warning__text">
              Precisa de ajuda? Clique aqui
            </div>
          </div>
        </div>
      </div>
    );
  }
}
