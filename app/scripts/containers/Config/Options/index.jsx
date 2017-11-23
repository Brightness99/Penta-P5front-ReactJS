// @flow

import React from 'react';
import cx from 'classnames';
import { shouldComponentUpdate, isSelectionComplete } from 'utils/helpers';
import { removePartSelection } from 'actions';
import { VideoIcon } from 'components/Icons';
import Modal from 'components/Modal';
import Loading from 'components/Loading';
import { Accordion, AccordionItem } from 'components/Accordion';
import MoreInfo from 'components/MoreInfo';
import { FunnelBlock } from 'components/Funnel';
import PartsLabel from './PartsLabel';
import SelectView from './SelectView';
import ListItem from './ListItem';

type Props = {
  locale: {},
  viewType?: string,
  screenSize: string,
  order: number,
  isLoading: boolean,
  dispatch: () => {},
  options: {},
  selection: {},
  onSelect: () => {},
  calculator: {},
  finalProduct: {},
};

export default class OptionsBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: {
        isOpen: false,
        partId: '',
        optionId: '',
        itemId: '',
      },
    };
  }

  static defaultProps = {
    viewType: 'gallery',
  };

  shouldComponentUpdate = shouldComponentUpdate;

  static props: Props;

  handlePartRemove = (part: string) => {
    const { dispatch } = this.props;

    dispatch(removePartSelection(part));
  };

  handleZoomClick = (imageBig, alt) => {
    this.setState({
      modal: {
        isOpen: true,
        type: 'image',
        link: imageBig,
        text: alt,
      },
    });
  };

  handleCloseModal = () => {
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        isOpen: false,
        type: '',
        link: '',
        text: '',
      },
    });
  };

  handleModal() {
    const { modal } = this.state;

    return (
      <Modal handleCloseModal={this.handleCloseModal}>
        <img src={`http://printi.com.br${modal.link}`} alt={modal.text} title={modal.text} />
      </Modal>
    );
  }

  renderCustomQuantity(option) {
    switch (option) {
      case 'format':
        return this.renderCustomFormat();
      default:
        return null;
    }
  }

  renderCustomFormat() {
    const { viewType } = this.props;

    const item = {
      id: 'custom',
      imageSmall: '/previews.php?img=fallback-image180x180-final.jpg&type=icon',
      name: 'Personalizar',
    };
    return (
      <ListItem
        item={item}
        viewType={viewType}
        key={item.id}
        optionKey={`${item.id}`}
        checked={false}
        onSelect={(ev) => console.log(ev)}
        partId={'format'}
        enableZoom={false}
      />
    );
  }

  renderOption(part) {
    const { viewType, selection, onSelect } = this.props;

    return (
      <div>
        <ul className={cx(viewType === 'list' && 'app__config__options--show-list')}>
          {part.attributes.filter((attribute) => attribute.visible).map((attribute) => (
            <li key={attribute.key}>
              <div className="app__config__options-header">
                <h4>
                  {attribute.name}
                </h4>
                {attribute.video.length >= 1 &&
                  <button onClick={() => console.log('CU DE ANU')} className="app__config__options-header__youtube">
                    <VideoIcon /> Vídeo explicativo
                  </button>
                }
              </div>
              <ul className="app__config__options-body">
                {attribute.options.map((option) => (
                  <ListItem
                    item={option}
                    viewType={viewType}
                    key={option.id}
                    optionKey={`${part.id}-${attribute.key}`}
                    checked={selection && selection[part.id] ? option.id === selection[part.id][attribute.key] : false}
                    onSelect={onSelect}
                    partId={part.id}
                    onZoomClick={() => this.handleZoomClick(option.imageBig, `${attribute.name} - ${option.name}`)}
                    enableZoom={true}
                  />
                ))}
                {attribute.hasCustom && this.renderCustomQuantity(part.id, attribute.key)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderOptionList() {
    const { options: { parts } } = this.props;
    if (parts.length === 1) {
      return (
        <div className="app__config__options-listing">
          {this.renderOption(parts[0])}
        </div>
      );
    }

    return (
      <Accordion className="app__config__options-listing">
        {parts.map((part, index) => (
          <AccordionItem key={part.id}>
            <h3>
              {part.name}
              {index > 0 &&
                <button
                  className="atm-link-button app__config__remove-button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    return this.handlePartRemove(part.id);
                  }}
                >
                  Remover
                </button>
              }
            </h3>
            {this.renderOption(part)}
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  render() {
    const { viewType, locale, options: { parts }, dispatch, order, screenSize, isLoading, selection } = this.props;
    const { modal } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <FunnelBlock
        order={order}
        locale={locale}
        screenSize={screenSize}
        isComplete={Object.keys(selection).length > 0 && isSelectionComplete(selection)}
        header={[
          <span key="options-block-title">{locale.TITLE}</span>,
          <button className="app__config__block-header__button" key="options-block-button">{locale.COMBINATIONS}</button>,
          <MoreInfo key="options-block-more-info" text={locale.MORE_INFO_TEXT} />,
        ]}
        className="app__config__options-block"
      >
        <div className="app__config__options">
          <PartsLabel locale={locale} parts={parts} />
          <SelectView locale={locale} dispatch={dispatch} viewType={viewType} />
          {this.renderOptionList()}
          {modal.isOpen && this.handleModal()}
        </div>
      </FunnelBlock>
    );
  }
}
