// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'quarks/Inputs';

import { LinkIcon, GmailIcon, FacebookIcon } from 'components/Icons';

type Props = {
};

export default class ShareCode extends React.Component {
  static props: Props;
  static state: State;

  render() {
    return (
      <div className="org-modal-share">
        <h4 className="title-modal-share">Compartilhar código</h4>
        <p className="subtitle-modal-share">Escolha a forma que acha mais fácil para indicar a Printi para seus amigos. \o/</p>
        <div className="mol-texts-modal-share">
          <div className="atm-text-modal-share">
            <GmailIcon />
            <p>Contatos do Gmail</p>
          </div>
          <div className="atm-text-modal-share link-icon">
            <LinkIcon />
            <p>Copiar link promocional</p>
          </div>
          <div className="atm-text-modal-share facebook-icon">
            <FacebookIcon />
            <p>Compartilhar Facebook</p>
          </div>
        </div>
        <div className="mol-share-email">
          <p className="atm-text-emails">Se preferir, digite os emails:</p>
          <form className="mol-share" onSubmit={this.handleSubmit}>
            <div className="atm-input-link">
              <Input
                name={name}
                value=""
                onChange={this.handleChange}
                placeholder="Endereço de email..."
                className="atm-input"
              />
            </div>
            <button className="btn-default btn-secondary fnt-sbold btn-sm">
              Enviar
            </button>
          </form>
          <p className="atm-lengend-emails">Use vírgula para separar os emails. Por exemplo: email-1@printi.com.br, email-2@printi.com.br</p>
        </div>
      </div>
    );
  }
}
