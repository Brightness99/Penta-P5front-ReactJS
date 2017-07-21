// @flow

import React from 'react';
import { vsprintf } from 'sprintf-js';

import { CalendarIcon, HelpIcon } from 'components/Icons';
import PrePressTemplate from './PrePressTemplate';

type Props = {
  locale: {},
  templates: {},
  dispatch: () => {},
  product: {},
};

const art_text = 'A arte deve ser enviada até %s %s às %s. Após esse período a data para a previsão de entrega será alterada.';

export default class Warning extends React.Component {
  static props: Props;

  render() {
    const { templates, dispatch, product } = this.props;

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
          <PrePressTemplate templates={templates} dispatch={dispatch} productTitle={product.title} />
        </div>
      </div>
    );
  }
}
