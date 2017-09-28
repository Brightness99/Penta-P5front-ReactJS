// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import { IconLeftButton, TextButton, RoundedTransparentButton, RoundedConfirmationButton } from 'atoms/Buttons';
import { BoxRadio } from 'atoms/Inputs';
import { Accordion, AccordionItem, AccordionItemBody, AccordionItemTitle } from 'components/Accordion/nAccordion';
import { PictureIcon } from 'components/Icons';
import ProposalItem from './ProposalItem';


type Props = {
  screenSize: string,
  onChange: func
};

type State = {
  activeButton: string,
  value: any
};

export class ArtProposalContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: RichTextEditor.createEmptyValue(),
      activeButton: 'approve',
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  static state: State;

  onChange = (val) => {
    this.setState({ value: val });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        val.toString('html')
      );
    }
  };

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

  getProposal() {
    const { activeButton } = this.state;

    return (
      <div className="container-proposal">
        <div className="content-proposal">
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
    const { activeButton } = this.state;
    return (
      <div className="container-proposal">
        <div className="content-proposal">
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

