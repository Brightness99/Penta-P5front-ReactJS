// @flow

import React from 'react';
import cx from 'classnames';
import SVG from 'react-inlinesvg';
import { removePartSelection } from 'actions';
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

  static props: Props;

  handlePartRemove = (part: string) => {
    const { dispatch } = this.props;

    dispatch(removePartSelection(part));
  };

  handleZoomClick = (ev) => {
    const part = ev.currentTarget.name.split('-');

    this.setState({
      modal: {
        isOpen: true,
        partId: part[0],
        optionId: part[1],
        itemId: ev.currentTarget.value,
      },
    });
  };

  handleCloseModal = () => {
    const { modal } = this.state;

    this.setState({
      modal: {
        ...modal,
        isOpen: false,
      },
    });
  };

  handleModal() {
    const { options: { list } } = this.props;
    const { modal: { optionId, partId, itemId } } = this.state;

    let altText = '';

    const imgSrc = list
      .filter((part) => part.id === partId)
      .reduce((prevPart, currentPart) => {
        altText += `${currentPart.name} `;
        return currentPart.options
        .filter((option) => option.key === optionId)
          .reduce((prevOption, currentOption) => {
            altText += `- ${currentOption.name} `;
            return currentOption.items
              .filter((item) => item.id === itemId)
              .reduce((prevItem, currentItem) => {
                altText += `- ${currentItem.name}`;
                return currentItem.image_big;
              }, '');
          }, '');
      }, '');

    return (
      <Modal handleCloseModal={this.handleCloseModal}>
        <img src={`http://printi.com.br${imgSrc}`} alt={altText} />
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
      image_small: '/previews.php?img=fallback-image180x180-final.jpg&type=icon',
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

  renderOption(optionsList) {
    const { viewType, selection, onSelect } = this.props;
    console.log(optionsList);
    return (
      <div>
        <ul className={cx(viewType === 'list' && 'app__config__options--show-list')}>
          {optionsList.options.filter((option) => option.visible).map((option) => (
            <li key={option.key}>
              <div className="app__config__options-header">
                <h4>
                  {option.name}
                </h4>
                <div className="app__config__options-header__youtube">
                  <SVG src={require('assets/media/svg/icon_video.svg')} /> Vídeo explicativo
                </div>
              </div>
              <ul className="app__config__options-body">
                {option.items.map((optionItem) => (
                  <ListItem
                    item={optionItem}
                    viewType={viewType}
                    key={optionItem.id}
                    optionKey={`${optionsList.id}-${option.key}`}
                    checked={optionItem.id === selection[optionsList.id][option.key]}
                    onSelect={onSelect}
                    partId={optionsList.id}
                    onZoomClick={this.handleZoomClick}
                    enableZoom={true}
                  />
                ))}
                {this.renderCustomQuantity(option.key)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  renderOptionList() {
    const { options: { parts, list } } = this.props;
    if (parts.total === 1) {
      return (
        <div className="app__config__options-listing">
          {this.renderOption(list[0])}
        </div>
      );
    }
    return (
      <Accordion className="app__config__options-listing">
        {list.map((item, index) => (
          <AccordionItem key={item.id}>
            <h3>
              {item.name}
              {index > 0 &&
                <span
                  role="link"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    return this.handlePartRemove(item.id);
                  }}
                >
                  Remover
                </span>
              }
            </h3>
            {this.renderOption(item)}
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  render() {
    const { viewType, locale, options: { parts }, dispatch, order, screenSize, isLoading } = this.props;
    const { modal } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <FunnelBlock
        order={order}
        locale={locale}
        screenSize={screenSize}
        header={[
          <span key="source-block-title">{locale.TITLE}</span>,
          <button className="app__config__block-header__button">{locale.COMBINATIONS}</button>,
          <MoreInfo key="source-block-more-info" text={locale.MORE_INFO_TEXT} />,
        ]}
        className="app__config__options-block"
      >
        <div className="app__config__options">
          <PartsLabel locale={locale} total={parts.total} names={parts.names} />
          <SelectView locale={locale} dispatch={dispatch} viewType={viewType} />
          {this.renderOptionList()}
          {modal.isOpen && this.handleModal()}
        </div>
      </FunnelBlock>
    );
  }
}
