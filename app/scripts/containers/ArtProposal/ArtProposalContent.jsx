// @flow
import React from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { isObject } from 'utils/helpers';
import { newProposalRequest, approveProposalRequest, fetchSingleFileRequest } from 'actions';
import { RoundedTransparentButton, RoundedConfirmationButton } from 'atoms/Buttons';
import { BoxRadio } from 'atoms/Inputs';
import { CheckBox } from 'components/Input';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';
import { PictureIcon, StatusIcon } from 'components/Icons';
import ProposalItem from './ProposalItem';

type Props = {
  screenSize: string,
  activeIndex: string,
  proposals: {},
  dispatch: () => {},
};

type State = {
  activeButton: string,
  customerMessageValue: any,
  customerMessage: string,
  editorWidth: number,
  proposal: {},
  activeIndex: number,
  confirmChecked: boolean,
};

export class ArtProposalContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customerMessageValue: RichTextEditor.createEmptyValue(),
      activeButton: 'approve',
      editorWidth: 500,
      proposal: props.proposals[props.activeIndex],
      activeIndex: props.activeIndex,
      confirmChecked: false,
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  componentDidMount() {
    const { screenSize } = this.props;
    const width = document.getElementsByClassName('container')[0].clientWidth;
    const minusWidth = ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize) ? 40 : 380;
    this.setState({ editorWidth: width - minusWidth });
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = this.state;
    const newActiveIndex = nextProps.activeIndex;
    const { proposals } = this.props;
    if (activeIndex !== newActiveIndex) {
      this.setState({
        activeIndex: newActiveIndex,
        proposal: proposals[newActiveIndex],
      });
    }
  }

  onCustomerMessageChange = (value) => {
    console.log('value ===>', value.toString('html'));
    this.setState({
      customerMessageValue: value,
      customerMessage: value.toString('html'),
    });
  };

  static props: Props;

  static state: State;

  onChange = () => {};

  handleSelection = (ev) => {
    this.setState({
      activeButton: ev.currentTarget.value,
    });
  };

  handleConfirmChecked = () => {
    const { confirmChecked } = this.state;
    this.setState({ confirmChecked: !confirmChecked });
  };

  confirmButtonClickHandler = () => {
    const { dispatch } = this.props;
    const { proposal } = this.state;
    const payload = {
      order_item_id: proposal.order_item_id,
      proposal_id: proposal.id,
    };
    dispatch(approveProposalRequest(payload));
  };

  addFileButtonClickHandler = () => {
  };

  requestButtonClickHandler = () => {
    const { dispatch } = this.props;
    const { proposal, customerMessage } = this.state;
    const payload = {
      order_item_id: proposal.order_item_id,
      proposal_id: proposal.id,
      customer_message: customerMessage,
    };
    dispatch(newProposalRequest(payload));
  }

  renderMobile() {
    const { proposals } = this.props;
    let accordionList = null;
    if (Object.getOwnPropertyNames(proposals).length !== 0)  {
      accordionList = proposals.map((item, index) => {
        const proposalTitle = `Proposta ${proposals.length - index}`;
        return (
          <Accordion key={item.id}>
            <AccordionItem>
              <AccordionItemTitle className="atm-header-menu-title">{proposalTitle}</AccordionItemTitle>
              <AccordionItemBody>{this.getProposal(item)}</AccordionItemBody>
            </AccordionItem>
          </Accordion>
        );
      });
    }
    return (
      <div className="accordion-wrapper">
        {accordionList}
      </div>
    );
  }

  getProposal = (proposal) => {
    console.log('active proposal ===> ', this.state.proposal);
    console.log('active activeIndex ===> ', this.state.activeIndex);

    const { activeButton, editorWidth, activeIndex, confirmChecked } = this.state;
    const { proposals } = this.props;
    let renderMark = null;
    if (isObject(proposal)) {
      const proposalTitle = `Proposta ${proposals.length - activeIndex}`;

      const customerProposalItemMark = (proposal.customer_message == null) ?
        null :
        (<ProposalItem proposal={proposal} type={'customer'} />);
      const waitingMark = (proposal.status === 'waiting_customer') ?
      //const waitingMark = (true) ?
        (
          <div>
            <p className="subtitle">E agora, o que quer fazer? :)</p>
            <div className="approval-button-wrapper">
              <BoxRadio
                value="approve"
                onChange={this.handleSelection}
                name="pane-type"
                checked={activeButton === 'approve'}
              >
                Aprovar a proposta
              </BoxRadio>
              <BoxRadio
                value="request"
                onChange={this.handleSelection}
                name="pane-type"
                checked={activeButton === 'request'}
              >
                Solicitar alteração
              </BoxRadio>
            </div>
            {
              (activeButton === 'approve') ?
              (
                <div className="bottom-button-wrapper">
                  <div>
                    <label className="check-label">
                      <CheckBox
                        onChange={this.handleConfirmChecked}
                        checked={confirmChecked}
                      />
                      Estou ciente de que após aprovar a proposta não será possível solicitar novas alterações.
                    </label>
                  </div>
                  <RoundedConfirmationButton
                    isEnabled={confirmChecked}
                    onClick={this.confirmButtonClickHandler}
                  >
                    Confirmar aprovação
                  </RoundedConfirmationButton>
                </div>
              ) :
              (
                <div>
                  <RichTextEditor
                    style={{ width: editorWidth }}
                    className="text-editor"
                    value={this.state.customerMessageValue}
                    onChange={this.onCustomerMessageChange}
                  />
                  <div className="bottom-button-wrapper">
                    <RoundedTransparentButton onClick={this.addFileButtonClickHandler}>
                      <PictureIcon />
                      <span>Adicionar arquivos</span>
                    </RoundedTransparentButton>
                    <RoundedConfirmationButton
                      isEnabled={true}
                      onClick={this.requestButtonClickHandler}
                    >
                      enviar solicitação
                    </RoundedConfirmationButton>
                  </div>
                </div>
              )
            }
          </div>
        ) :
        null;
      renderMark = (
        <div className="container-proposal">
          <div className="content-proposal">
            <div className="proposal-header">
              <h2 className="title-proposal">{proposalTitle}</h2>
              <div className="container-right">
                <div className="container-status">
                  <p className="sidetitle regular">Última alteração</p>
                  <p className="sidetitle">{proposal.updated_at}</p>
                </div>
                <div className="container-status">
                  <p className="sidetitle regular">Status</p>
                  <label className={`status-${proposal.status}`} >
                    <StatusIcon />
                    <p className="statuslabel">{proposal.status}</p>
                  </label>
                </div>
              </div>
            </div>
            <p className="subtitle">Alteração solicitada</p>
            {customerProposalItemMark}
            <ProposalItem proposal={proposal} type={'designer'} />
            {waitingMark}
          </div>
        </div>
      );
    }
    return renderMark;
  }

  renderDesktop() {
    console.log('active proposal ===> ', this.state.proposal);
    console.log('active activeIndex ===> ', this.state.activeIndex);

    const { activeButton, editorWidth, proposal, activeIndex, confirmChecked } = this.state;
    const { proposals } = this.props;
    let renderMark = null;
    const proposalTitle = `Proposta ${proposals.length - activeIndex}`;

    const customerProposalItemMark = (proposal.customer_message == null) ?
      null :
      (<ProposalItem proposal={proposal} type={'customer'} />);
    const waitingMark = (proposal.status === 'waiting_customer') ?
    //const waitingMark = (true) ?
      (
        <div>
          <p className="subtitle">E agora, o que quer fazer? :)</p>
          <div className="approval-button-wrapper">
            <BoxRadio
              value="approve"
              onChange={this.handleSelection}
              name="pane-type"
              checked={activeButton === 'approve'}
            >
              Aprovar a proposta
            </BoxRadio>
            <BoxRadio
              value="request"
              onChange={this.handleSelection}
              name="pane-type"
              checked={activeButton === 'request'}
            >
              Solicitar alteração
            </BoxRadio>
          </div>
          {
            (activeButton === 'approve') ?
            (
              <div className="bottom-button-wrapper">
                <div>
                  <label className="check-label">
                    <CheckBox
                      onChange={this.handleConfirmChecked}
                      checked={confirmChecked}
                    />
                    Estou ciente de que após aprovar a proposta não será possível solicitar novas alterações.
                  </label>
                </div>
                <RoundedConfirmationButton
                  isEnabled={confirmChecked}
                  onClick={this.confirmButtonClickHandler}
                >
                  Confirmar aprovação
                </RoundedConfirmationButton>
              </div>
            ) :
            (
              <div>
                <RichTextEditor
                  style={{ width: editorWidth }}
                  className="text-editor"
                  value={this.state.customerMessageValue}
                  onChange={this.onCustomerMessageChange}
                />
                <div className="bottom-button-wrapper">
                  <RoundedTransparentButton onClick={this.addFileButtonClickHandler}>
                    <PictureIcon />
                    <span>Adicionar arquivos</span>
                  </RoundedTransparentButton>
                  <RoundedConfirmationButton
                    isEnabled={true}
                    onClick={this.requestButtonClickHandler}
                  >
                    enviar solicitação
                  </RoundedConfirmationButton>
                </div>
              </div>
            )
          }
        </div>
      ) :
      null;
    renderMark = (
      <div className="container-proposal">
        <div className="content-proposal">
          <div className="proposal-header">
            <h2 className="title-proposal">{proposalTitle}</h2>
            <div className="container-right">
              <div className="container-status">
                <p className="sidetitle regular">Última alteração</p>
                <p className="sidetitle">{proposal.updated_at}</p>
              </div>
              <div className="container-status">
                <p className="sidetitle regular">Status</p>
                <label className={`status-${proposal.status}`} >
                  <StatusIcon />
                  <p className="statuslabel">{proposal.status}</p>
                </label>
              </div>
            </div>
          </div>
          <p className="subtitle">Alteração solicitada</p>
          {customerProposalItemMark}
          <ProposalItem proposal={proposal} type={'designer'} />
          {waitingMark}
        </div>
      </div>
    );
    return renderMark;
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtProposalContent);

