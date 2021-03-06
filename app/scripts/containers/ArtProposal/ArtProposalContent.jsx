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
import BriefingContent from './BriefingContent';

type Props = {
  screenSize: string,
  activeIndex: string,
  proposals: {},
  match: {},
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
  briefingClass: string,
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

  updateBriefContent(className) {
    this.setState({ briefingClass: className });
  }

  renderMobile() {
    const { proposals, screenSize, match } = this.props;
    const { briefingClass } = this.state;
    const length = proposals.length;
    let accordionList = null;
    const briefingMark =
      (
        <Accordion key={`briefing-item-${length.toString()}`}>
          <AccordionItem>
            <AccordionItemTitle className="atm-header-menu-title">BRIEFING INICIAL</AccordionItemTitle>
            <AccordionItemBody className={briefingClass} >
              <BriefingContent
                activeIndex={this.state.activeIndex}
                proposals={proposals.list}
                screenSize={screenSize}
                updateTab={(className) => this.updateBriefContent(className)}
                match={match}
              />
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      );
    if (Object.getOwnPropertyNames(proposals).length !== 0)  {
      accordionList = proposals.map((item, index) => {
        const proposalTitle = `Proposta ${proposals.length - index}`;
        return (
          <Accordion key={`proposal-item-${index.toString()}`}>
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
        {briefingMark}
      </div>
    );
  }

  getProposal = (proposal) => {
    const { activeButton, editorWidth, activeIndex, confirmChecked } = this.state;
    const { proposals } = this.props;
    let renderMark = null;
    if (isObject(proposal)) {
      const proposalTitle = `Proposta ${proposals.length - activeIndex}`;

      const customerProposalItemMark = (proposal && proposal.customer_message) ?
        (<ProposalItem proposal={proposal} type={'customer'} />) :
        null;
      const waitingMark = (proposal && proposal.status === 'waiting_customer') ?
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
                  <p className="sidetitle">{proposal && proposal.updated_at}</p>
                </div>
                <div className="container-status">
                  <p className="sidetitle regular">Status</p>
                  <label className={`status-${proposal && proposal.status}`} >
                    <StatusIcon />
                    <p className="statuslabel">{proposal && proposal.status}</p>
                  </label>
                </div>
              </div>
            </div>
            <p className="subtitle">Alteração solicitada</p>
            {customerProposalItemMark}
            {proposal && <ProposalItem proposal={proposal} type={'designer'} />}
            {waitingMark}
          </div>
        </div>
      );
    }
    return renderMark;
  }

  renderDesktop() {
    const { activeButton, editorWidth, proposal, activeIndex, confirmChecked } = this.state;
    const { proposals } = this.props;
    let renderMark = null;
    const proposalTitle = `Proposta ${proposals.length - activeIndex}`;

    const customerProposalItemMark = (proposal && proposal.customer_message) ?
      (<ProposalItem proposal={proposal} type={'customer'} />) :
      null;
    const waitingMark = (proposal && proposal.status === 'waiting_customer') ?
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
                <p className="sidetitle">{proposal && proposal.updated_at}</p>
              </div>
              <div className="container-status">
                <p className="sidetitle regular">Status</p>
                <label className={`status-${proposal && proposal.status}`} >
                  <StatusIcon />
                  <p className="statuslabel">{proposal && proposal.status}</p>
                </label>
              </div>
            </div>
          </div>
          <p className="subtitle">Alteração solicitada</p>
          {customerProposalItemMark}
          {proposal && <ProposalItem proposal={proposal} type={'designer'} />}
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

