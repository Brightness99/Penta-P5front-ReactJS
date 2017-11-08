// @flow

import React from 'react';
import OverlaySpinner from 'components/OverlaySpinner';
import { Button } from 'quarks/Inputs';
import Modal from 'components/Modal';
import { WarningFilled } from 'components/Icons';
import TopMenuBar from '../CimpressComponents/TopMenuBar';
import SideBarPanel from '../CimpressComponents/SideBarPanel';
import CanvasToolBar from '../CimpressComponents/CanvasToolBar';
import CanvasArea from '../CimpressComponents/CanvasArea';
import BottomMenuBar from '../CimpressComponents/BottomMenuBar';
import CanvasCutPreview from './CanvasCutPreview';
import cimpressConfigBuilder from './cimpressConfigBuilder';

type Props = {
  cimpressInfo: CimpressInfo,
  isSku: boolean,
  handleCanvasFinalize: (docRef) => void,
  handleOrientationChanged: (isVertical: number) => void
};

type State = {
  isReady: boolean,
  isOrientationChanging: boolean,
  isOpenModal: boolean,
  activeTab: number,
  isVertical: number,
  showCutPreview: boolean,
  previewUrls: Array<string>,
};

export default class Canvas extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isReady: false,
      isOrientationChanging: false,
      isOpenModal: false,
      activeTab: 1,
      showCutPreview: false,
      previewUrls: [],
    };
  }

  componentDidMount() {
    const oStyle = document.createElement('link');
    oStyle.type = 'text/css';
    oStyle.rel = 'stylesheet';
    document.head.appendChild(oStyle);
    oStyle.href = '//dcl.cimpress.io/1.4.7/dcl.css';

    const oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.onerror = this.handleError;
    oScript.onload = this.handleLoad;
    document.body.appendChild(oScript);
    oScript.src = '//dcl.cimpress.io/1.4.7/dcl.min.js';
  }

  componentWillReceiveProps(nextProps: Props) {
    const { isOrientationChanging } = this.state;
    const prevProps = this.props;

    if (prevProps.cimpressInfo && nextProps.cimpressInfo.orientation !== prevProps.cimpressInfo.orientation && isOrientationChanging) {
      const { cimpressInfo } = nextProps;
      global.designer.switchProduct({
        surfaceSpecifications: cimpressInfo.specifications,
      })
        .then(
          () => {
            this.setState({
              isOrientationChanging: false,
            });
          }
        );
    }
  }

  static props: Props;

  static state: State;

  handleOnSave = (docRef) => {
    const { handleCanvasFinalize } = this.props;

    if (handleCanvasFinalize && typeof handleCanvasFinalize === 'function') {
      handleCanvasFinalize(docRef);
    }
  };

  handleError = (oError) => {
    throw new URIError(`The script ${oError.target.src} is not accessible.`);
  };

  handleLoad = () => {
    const { cimpressInfo, isSku } = this.props;
    const config = cimpressConfigBuilder(cimpressInfo, isSku);
    global.designer.start(config)
      .then(
        () => {
          this.setState({
            isReady: true,
          });
        }
      );
  };

  handleSelectTab = (value) => {
    this.setState({
      activeTab: value,
    });
  };

  handleOrientationChanged = () => {
    const { handleOrientationChanged } = this.props;
    const { isVertical } = this.state;
    this.setState({
      isOrientationChanging: true,
    });
    if (handleOrientationChanged && typeof handleOrientationChanged === 'function') {
      handleOrientationChanged(isVertical);
    }
    this.handleCloseAlertModal();
  };

  handleOpenAlertModal = (isVertical) => {
    this.setState({
      isOpenModal: true,
      isVertical,
    });
  };

  handleCloseAlertModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  showPreview = (urls) => {
    this.setState({
      showCutPreview: true,
      previewUrls: urls,
    });
  };

  hidePreview = () => {
    this.setState({
      showCutPreview: false,
    });
  };

  renderModalDialog = () => {
    const { isOpenModal } = this.state;
    return (isOpenModal &&
    <Modal handleCloseModal={this.handleCloseAlertModal}>
      <section className="cimpress-alert-dialog">
        <WarningFilled />
        <h3>Atenção</h3>
        <span>Ao alterar a orientação você perderá todas as edições feitas até o momento.</span>
        <span>Deseja continuar?</span>
        <section className="buttons-block">
          <Button
            onClick={this.handleCloseAlertModal}
            kind="cancel"
          >Não</Button>
          <Button
            onClick={this.handleOrientationChanged}
            kind="success"
          >Sim</Button>
        </section>
      </section>
    </Modal>);
  };

  renderCanvas() {
    const { activeTab, showCutPreview } = this.state;
    const { cimpressInfo: { settings: { css }, orientation } } = this.props;

    return (
      <div
        className={`upload__canvas-schema ${!showCutPreview ? 'show' : ''}`}
      >
        <TopMenuBar key="top-menu-bar" handleSelectTab={this.handleSelectTab} />
        <div className="upload__canvas-schema_main-area-container" key="upload__canvasSchema_main-area-container">
          <SideBarPanel activeTab={activeTab} />
          <div className="upload__canvas-schema_canvas-container">
            <CanvasToolBar
              isVertical={orientation === 'vertical'}
              handleOrientation={this.handleOpenAlertModal}
            />
            <CanvasArea />
          </div>
        </div>
        <style>{css}</style>
        {this.renderModalDialog()}
      </div>
    );
  }

  renderPreview() {
    const { showCutPreview, previewUrls } = this.state;

    return (
      <section className={`upload__canvas-schema ${showCutPreview ? 'show' : ''}`}>
        <CanvasCutPreview previewUrls={previewUrls} />
      </section>
    );
  }

  render() {
    const { isReady, showCutPreview, isOrientationChanging } = this.state;
    const { cimpressInfo: { settings: { has_cut_view } }, isSku } = this.props;

    return (
      <OverlaySpinner isLoading={!isReady || isOrientationChanging}>
        {this.renderCanvas()}
        {this.renderPreview()}
        <BottomMenuBar
          key="bottom-menu-bar"
          handlePreview={this.showPreview}
          hasCutPreview={!isSku && has_cut_view === '1'}
          isPreview={showCutPreview}
          handleReturnToEditor={this.hidePreview}
          handleSave={this.handleOnSave}
        />
      </OverlaySpinner>
    );
  }
}
