// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  uploadFetch,
  uploadFinishRequest,
  uploadSetOrientationRequest
} from 'actions';
import UploadContent from './UploadContent';

type Props = {
  screenSize: string,
  match: {
    params: {
      slug: string,
      itemId: string,
    }
  },
  isLoading: boolean,
  isFinishInProgress: boolean,
  uploadInfo: {},
  uploadSetOrientation: (data: {itemId: string, isVertical: number, isAccount: boolean}) => void,
  uploadInfoFetch: (data: {itemId: string, isAccount: boolean}) => void,
  uploadFinish: (data: { request: FinishUploadType, itemId: string, isAccount: boolean }) => void,
  uploadFileProgress: {
    isRunning: boolean,
    error: boolean,
    message: string,
  },
};

class AccountUploadPage extends React.Component {

  componentDidMount() {
    const { match: { params: { itemId } } } = this.props;
    const { uploadInfoFetch } = this.props;
    uploadInfoFetch({ itemId, isAccount: true });
  }

  props: Props;

  handleUploadFinish = (request: FinishUploadType) => {
    const { uploadFinish, uploadInfo: { globalFlags: { order_item_id } } } = this.props;


    if (uploadFinish && typeof uploadFinish === 'function') {
      uploadFinish({ request, itemId: order_item_id, isAccount: true });
    }
  };

  handleOrientationChanged = (isVertical: number) => {
    const { uploadSetOrientation, uploadInfo: { globalFlags: { order_item_id } } } = this.props;
    if (uploadSetOrientation && typeof uploadSetOrientation === 'function') {
      uploadSetOrientation({ itemId: order_item_id, isVertical, isAccount: true });
    }
  };

  render() {
    const { isLoading, screenSize, isFinishInProgress, uploadFileProgress, uploadInfo } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Marca página',
        url: '/configuracao-marca-pagina',
      },
      {
        title: 'Enviar arte',
        url: '',
      },
    ];

    return (
      <UploadContent
        breadcrumb={breadcrumb}
        isLoading={isLoading}
        isAccount={true}
        uploadInfo={uploadInfo}
        uploadFileProgress={uploadFileProgress}
        screenSize={screenSize}
        isFinishInProgress={isFinishInProgress}
        handleOrientationChanged={this.handleOrientationChanged}
        handleUploadFinish={this.handleUploadFinish}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.app.screenSize,
  isLoading: state.upload.isLoaded,
  router: state.router,
  isFinishInProgress: state.upload.uploadFinish.isRunning,
  uploadInfo: state.upload.object,
  uploadFileProgress: state.upload.uploadFile,
});

const mapDispatchToProps = (dispatch) => ({
  uploadInfoFetch: (data: {}) => dispatch(uploadFetch(data)),
  uploadSetOrientation: (data: {}) => dispatch(uploadSetOrientationRequest(data)),
  uploadFinish: (data: {}) => dispatch(uploadFinishRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountUploadPage);

