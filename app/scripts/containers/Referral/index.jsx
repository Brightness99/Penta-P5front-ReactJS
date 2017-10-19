// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile, shouldComponentUpdate } from 'utils/helpers';

import Breadcrumbs from 'components/Breadcrumbs';
import Modal from 'components/Modal';
import { Input } from 'quarks/Inputs';

import ShareCode from './Modals/ShareCode';

type Props = {
  app: AppStore,
  router: RouterStore,
  dispatch: () => {},
  children: any,
};

type State = {
  modal: {
    type: string,
    isOpen: boolean,
    itemId: string,
  },
};

export class Referral extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = { showShareModal: false };
  }

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;
  static state: State;

  handleCloseModal = () => {
    this.setState({ showShareModal: false });
  };

  handleShowingModal = () => {
    this.setState({ showSharetModal: !this.state.showShareModal });
  };

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Indique a Printi',
      },
    ];
    return (
      <div>

        <div className="modal-referral">
          <Modal handleCloseModal={this.handleModalClose}>
            <ShareCode />
          </Modal>
        </div>

        <section className="bg-referral">
          <div className="org-referral-page">
            <div className="container">
              {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
              <h2 className="title-referral">Indique a Printi</h2>

              <div className="mol-texts-referral">
                <h3 className="qrk-title">Quem indica ganha. E quem é indicado também!</h3>
                <p className="qrk-text">Isso mesmo: indique a Printi para seus amigos, a cada um que comprar, você e ele ganham créditos para trocar por nossos produtos.</p>
              </div>

              <div className="mol-content-share">
                <p className="qrk-text-share">Compartilhe seu código promocional:</p>
                <form className="mol-share" onSubmit={this.handleSubmit}>
                  <div className="atm-input-link">
                    <Input
                      name={name}
                      value=""
                      onChange={this.handleChange}
                      className="atm-input"
                    />
                    <Link to="#" className="atm-link-copy">
                      copiar
                    </Link>
                  </div>
                  <button className="btn-default btn-secondary fnt-sbold btn-sm">
                      Compartilhar
                  </button>
                </form>
              </div>
            </div>
            <div className="mol-infos-referral">
              <div className="container">
                <div className="atm-infos">
                  <p>Depois de convidar seus amigos, você poderá visualizar o statos das indicações.</p>
                  <p>Em caso de dúvida, visite a nossa <Link to="/central-de-ajuda">Central de ajuda</Link></p>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    );
  }
}

function mapStoreToProps(state) {
  return ({
    app: state.app,
  });
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStoreToProps, mapDispatchToProps)(Referral);
