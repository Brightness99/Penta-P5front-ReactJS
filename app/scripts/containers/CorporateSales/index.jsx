// @flow

import React from 'react';
import { connect } from 'react-redux';

import { submitContactForm as submitAction } from 'actions';
import corporateSalesSelector from 'selectors/products';
import type { ContactFormState } from 'reducers/contact-form';

import { CustomersRelyBlock } from 'components/LandingPage';
import Modal from 'components/Modal';
import ContactForm from 'components/ContactForm';
import MainBenefits from './MainBenefits';
import CloudTools from './CloudTools';
import BannerCloud from './BannerCloud';
import RequestSample from './RequestSample';
import type { DataType } from '../../actions/contact-form';

type Props = {
  app: AppStoreType,
  router: RouterStore,
  locale: {},
  CorporateSales: {},
  dispatch: () => {},
  contactForm: ContactFormState,
  submitContactForm?: (data: DataType) => void,
};

type State = {
  showContactModal: boolean,
};

export class CorporateSales extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { showContactModal: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contactForm.isLoaded) {
      this.handleShowingModal();
    }
  }

  static props: Props;
  static state: State;

  handleShowingModal = () => {
    this.setState({ showContactModal: !this.state.showContactModal });
  };

  handleCloseModal = () => {
    this.setState({ showContactModal: false });
  };

  handleSubmit = (data) => {
    const { submitContactForm } = this.props;
    this.handleCloseModal();
    if (typeof susubmitContactForm === 'function') {
      submitContactForm(data);
    }
  };

  render() {
    return (
      <section>
        {
          this.state.showContactModal &&
          <Modal handleCloseModal={this.handleCloseModal}>
            <ContactForm onSubmit={data => this.handleSubmit(data)} />
          </Modal>
        }
        <BannerCloud handleModalShowing={this.handleShowingModal} />
        <MainBenefits />
        <CloudTools handleModalShowing={this.handleShowingModal} />
        <CustomersRelyBlock />
        <RequestSample handleModalShowing={this.handleShowingModal} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({}, corporateSalesSelector(state), {
    contactForm: state.contactForm,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    submitContactForm: data => dispatch(submitAction(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CorporateSales);
