// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  uploadFetch,
  uploadFinishRequest,
  uploadSetOrientationRequest
} from 'actions';
import { push } from 'modules/ReduxRouter';
import UploadContent from './UploadContent';

type Props = {
  match: {
    params: {
      slug: string,
      itemId: string,
    }
  },
  router: {
    location: {
      search: string,
    },
  },
  locale: {},
  isLoading: boolean,
  isFinishInProgress: boolean,
  uploadInfo: {},
  uploadSetOrientation: (data: { itemId: string, isVertical: number }) => void,
  uploadInfoFetch: (data: { slug: string, itemId: string }) => void,
  uploadFinish: (data: { request: FinishUploadType, itemId: string }) => void,
  uploadFileProgress: {
    isRunning: boolean,
    error: boolean,
    message: string,
  },
};

class FunnelUploadPage extends React.Component {

  componentDidMount() {
    const { slug, itemId } = this.props.match.params;
    const { router: { location: { search } }, uploadInfoFetch } = this.props;

    const isVertical = /isVertical=([^&]+)/.exec(search) ? /isVertical=([^&]+)/.exec(search)[1] : 0;
    uploadInfoFetch({ slug, itemId, isVertical });
  }

  props: Props;

  handleUploadFinish = (request: FinishUploadType) => {
    const { match: { params: { itemId } }, uploadFinish } = this.props;


    if (uploadFinish && typeof uploadFinish === 'function') {
      uploadFinish({ request, itemId });
    }
  };

  handleOrientationChanged = (isVertical: number) => {
    const { uploadSetOrientation, match: { params: { itemId } } } = this.props;

    if (uploadSetOrientation && typeof uploadSetOrientation === 'function') {
      uploadSetOrientation({ itemId, isVertical });
    }

    push(`?isVertical=${isVertical}`);
  };

  render() {
    const {
      isLoading,
      isFinishInProgress,
      uploadFileProgress,
      uploadInfo,
      locale } = this.props;
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
        title: locale.page.upload.BREADCRUMB_TITLE,
        url: '',
      },
    ];

    return (
      <UploadContent
        breadcrumb={breadcrumb}
        isLoading={isLoading}
        uploadInfo={uploadInfo}
        uploadFileProgress={uploadFileProgress}
        locale={locale}
        isFinishInProgress={isFinishInProgress}
        handleOrientationChanged={this.handleOrientationChanged}
        handleUploadFinish={this.handleUploadFinish}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.upload.isLoaded,
  router: state.router,
  locale: state.locale.translate,
  isFinishInProgress: state.upload.uploadFinish.isRunning,
  uploadInfo: state.upload.object,
  uploadFileProgress: state.upload.uploadFile,
});

const mapDispatchToProps = (dispatch) => ({
  uploadInfoFetch: (data: {}) => dispatch(uploadFetch(data)),
  uploadSetOrientation: (data) => dispatch(uploadSetOrientationRequest(data)),
  uploadFinish: (data) => dispatch(uploadFinishRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FunnelUploadPage);

