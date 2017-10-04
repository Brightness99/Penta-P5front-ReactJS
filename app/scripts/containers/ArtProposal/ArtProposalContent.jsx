// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { isObject } from 'utils/helpers';
import { RoundedTransparentButton, RoundedConfirmationButton } from 'atoms/Buttons';
import { BoxRadio } from 'atoms/Inputs';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';
import { PictureIcon } from 'components/Icons';
import ProposalItem from './ProposalItem';

type Props = {
  screenSize: string,
  activeIndex: string,
  proposals: {},
  onChange: func
};

type State = {
  activeButton: string,
  value: any,
  editorWidth: number,
  proposal: {},
  activeIndex: number,
};

export class ArtProposalContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: RichTextEditor.createEmptyValue(),
      activeButton: 'approve',
      editorWidth: 500,
      activeIndex: '',
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  static state: State;

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

  onChange = (val) => {};

  handleSelection = (ev) => {
    this.setState({
      activeButton: ev.currentTarget.value,
    });
  };

  renderMobile() {
    return (
      <div className="accordion-wrapper">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle className="atm-header-menu-title">PROPOSTA 3</AccordionItemTitle>
            <AccordionItemBody>{this.getProposal()}</AccordionItemBody>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle className="atm-header-menu-title">PROPOSTA 2</AccordionItemTitle>
            <AccordionItemBody>{this.getProposal()}</AccordionItemBody>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle className="atm-header-menu-title">PROPOSTA 1</AccordionItemTitle>
            <AccordionItemBody>{this.getProposal()}</AccordionItemBody>
          </AccordionItem>
        </Accordion>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle className="atm-header-menu-title">BREFING INICIAL</AccordionItemTitle>
            <AccordionItemBody>{this.getProposal()}</AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  getProposal = () => {
    const { activeButton, editorWidth } = this.state;
    return (
      <div className="container-proposal">
        <div className="content-proposal" id="content">
          <div className="proposal-header">
            <h2 className="title-proposal">Proposta 2</h2>
            <div className="container-right">
              <div className="container-status">
                <p className="sidetitle regular">Última alteração</p>
                <p className="sidetitle">22/04/2015 | 11:35</p>
              </div>
              <div className="container-status">
                <p className="sidetitle regular">Status</p>
                <span><image className="status-image" /></span>
                <p className="sidetitle">22/04/2015 | 11:35</p>
              </div>
            </div>
          </div>
          <p className="subtitle">Alteração solicitada</p>
          <ProposalItem />
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
          <div className="text-editor-wrapper">
            <RichTextEditor
              style={{ width: editorWidth }}
              className="text-editor"
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
          <div className="bottom-button-wrapper">
            <RoundedTransparentButton>
              <PictureIcon />
              <span>Adicionar arquivos</span>
            </RoundedTransparentButton>
            <RoundedConfirmationButton
              isEnabled={true}
              onClick={() => {}}
            >
              enviar solicitação
            </RoundedConfirmationButton>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    console.log('active proposal ===> ', this.state.proposal);
    console.log('active activeIndex ===> ', this.state.activeIndex);

    const { activeButton, editorWidth, proposal, activeIndex } = this.state;
    const { proposals } = this.props;
    let renderMark = null;
    if (isObject(proposal)) {
      const proposalTitle = `Proposta ${proposals.length - activeIndex}`;
      const customerProposalItemMark = (proposal.customer_message == null) ?
        null :
        (<ProposalItem proposal={proposal} type={'customer'} />);

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
                  <span><image className="status-image" /></span>
                  <p className="sidetitle">{proposal.status}</p>
                </div>
              </div>
            </div>
            <p className="subtitle">Alteração solicitada</p>
            {customerProposalItemMark}
            <ProposalItem proposal={proposal} type={'designer'} />
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
            <RichTextEditor
              style={{ width: editorWidth }}
              className="text-editor"
              value={this.state.value}
              onChange={this.onChange}
            />
            <div className="bottom-button-wrapper">
              <RoundedTransparentButton>
                <PictureIcon />
                <span>Adicionar arquivos</span>
              </RoundedTransparentButton>
              <RoundedConfirmationButton
                isEnabled={true}
                onClick={() => {}}
              >
                enviar solicitação
              </RoundedConfirmationButton>
            </div>
          </div>
        </div>
      );
    }
    

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

