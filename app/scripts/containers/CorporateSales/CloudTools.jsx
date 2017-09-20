// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'components/Modal';
import ContactForm from 'components/ContactForm';
import type { DataType } from 'components/ContactForm';
import { submitContactForm as submitAction } from 'actions';
import type { ContactFormState } from 'reducers/contact-form';
import cloudImage from 'assets/media/images/img-cloud.png';

type Props = { submitContactForm?: (data: DataType) => void, contactForm?: ContactFormState }
type State = { showModal: boolean };

class CloudTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.contactForm.isLoaded) {
      this.handleCloseModal();
    }
  }

  props: Props;
  state: State;

  handleCloseModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { submitContactForm } = this.props;
    return (
      <section className="container-cloudTools">
        {
          this.state.showModal &&
          <Modal handleCloseModal={this.handleCloseModal}>
            <ContactForm onSubmit={data => submitContactForm && submitContactForm(data)} />
          </Modal>
        }
        <div className="container">
          <h4 className="title-corporateSales">Conheça a cloud, uma ferramenta exclusiva da printi</h4>
          <div className="boxes-cloudTools">
            <div className="box-cloudTools">
              <p className="subtitle-cloudTools">Agilidade para seus materiais gráficos</p>
              <p className="text-cloudTools">
                Personalize arquivos de diferentes funcionários, unidades ou franquias e acompanhe
                a impressão e distribuição dos materiais. Tudo com total controle das quantidades e o uso correto da
                marca.
              </p>
              <button
                className="btn-default btn-secondary btn-lg"
                onClick={this.handleCloseModal}
              >
                Solicitar Atendimento
              </button>
              <Link to="/atendimento-exclusivo" className="link-aboutCloud">Ler mais sobre o Cloud</Link>
            </div>
            <div className="box-cloudTools">
              <img src={cloudImage} alt="Menu" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitContactForm: data => dispatch(submitAction(data)),
});

export default connect(state => ({ contactForm: state.contactForm }), mapDispatchToProps)(CloudTools);
