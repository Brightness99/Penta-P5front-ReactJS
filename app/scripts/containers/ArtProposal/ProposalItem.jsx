// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import config from 'config';
import Slider from 'react-slick';
import { RoundedTransparentButton } from 'atoms/Buttons';
import { DownloadIcon } from 'components/Icons';
import { PrevArrow, NextArrow } from 'components/Carousel';
import { fetchSingleFileRequest } from 'actions';

type Props = {
  proposal: {},
  type: string,
  dispatch: () => {}
}

class ProposalItem extends React.Component {

  static props: Props;

  componentWillReceiveProps(newProps) {
    
  }

  state = {
    selectedFileId: -1
  };

  renderFiles = (files) => {
    const { selectedFileId } = this.state;
    return (
      files.map((file, index) => (
        <div className={cx('slider-doc-item', (file.id === selectedFileId) && 'selected')} key={index.toString()} onClick={() => this.selectItem(file)}>
          <div className="doc">
            {/* <embed src={file.file_url} /> */}
            {/* <img src={file.file_url} alt={file.file_name} /> */}
          </div>
        </div>
      ))
    );
  }

  selectItem(file) {
    const { selectedFileId } = this.state;
    const newId = (selectedFileId === file.id) ? -1 : file.id;
    this.setState({ selectedFileId: newId });
  }

  downloadButtonClickHandler = () => {
    const { dispatch, proposal } = this.props;
    const { selectedFileId } = this.state;
    const payload = {
      order_item_id: proposal.order_item_id,
      proposal_id: proposal.id,
      file_id: selectedFileId,
    };
    dispatch(fetchSingleFileRequest(payload));
  }

  render() {
    const { proposal, type } = this.props;
    //Todo | get current name
    const currentName = 'Diogo Capelo';
    const name = (type === 'customer') ? currentName : proposal.designer_name;
    const message = (type === 'customer') ? proposal.customer_message : proposal.designer_message;
    const date = (type === 'customer') ? proposal.customer_message_at : proposal.sent_at;  //?
    const sliderMark = (type === 'designer') ?
      (
        <div>
          <div className="box-docs-wrapper">
            <div className="box-docs">
              <Slider
                className="slider-docs"
                dots={false}
                infinite={false}
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                dotsClass="atm-carousel-dots"
                autoplay={false}
                slidesToShow={4}
                slidesToScroll={1}
              >
                {this.renderFiles(proposal.files)}
              </Slider>
            </div>
          </div>
          <div className="download-container">
            <div className="button-wrapper">
              <RoundedTransparentButton onClick={this.downloadButtonClickHandler}>
                <DownloadIcon />
                <span>DOWNLOAD Dos ARQUIVOS</span>
              </RoundedTransparentButton>
            </div>
            <div className="note">
              <strong>IMPORTANTE!</strong> Esse arquivo é apenas para aprovação. Não é o arquivo final e não deve ser utilizado para a produção do material. 
            </div>
          </div>
        </div>
      ) :
      null;
    return (
      <div className={cx('proposal-item', (type === 'customer') ? 'customer-item' : '')}>
        <div className="item-header">
          <div className="avatar-wrapper">
            <image src="" />
          </div>

          <div className="name-wrapper">
            <p className="name">Enviado por</p>
            <p className="position">{name}</p>
          </div>
          {/* <div className="note">
            IMPORTANTE! Esse arquivo é apenas para aprovação. Não é o arquivo final e não deve ser utilizado para a produção do material.

          </div> */}
        </div>
        <div className="item-body">
          <p className="proposal-text"><div dangerouslySetInnerHTML={{ __html: message }} /></p>
          <div className="date">Enviado em {date}</div>
          {sliderMark}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalItem);

