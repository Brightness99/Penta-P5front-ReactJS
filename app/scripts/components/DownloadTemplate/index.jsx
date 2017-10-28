// @flow

import React from 'react';
import Loading from 'components/Loading/index';
import DownloadSection from './DownloadSection';

const currentStep = 3;

type Props = {
  handleNavigation: (step: 1 | 2 | 3) => void,
  requestDownloadTemplate: (file: string, orientation: 'vertical' | 'horizontal', data: DownloadFileFormType) => void,
  startTemplateDownload: () => void,
  finishTemplateDownload: () => void,
  downloadData: DownloadDataType,
  finalId: string,
  screenSize: string,
  productName: string,
}

type State = {
  form: {
    [key: string]: {
      orientation: { valid: boolean, value: string },
    },
  },
  canSubmit: boolean,
};

class DownloadTemplate extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      canSubmit: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { url: nextUrl } = nextProps.downloadData;
    const { url: prevUrl } = this.props.downloadData;

    if (prevUrl !== nextUrl) {
      this.triggerDownload(nextUrl);
      this.props.handleNavigation(currentStep + 1);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  static props: Props;
  static state: State;

  handleChange = (e: Event, formName: string) => {
    const { id, value } = e.currentTarget;
    const form = Object.assign({}, this.state.form[formName], {
      [id]: { value, valid: Boolean(value) },
    });
    let canSubmit = Boolean(value);
    Object.keys(form)
    .forEach((index) => {
      if (form[index].valid !== true) {
        canSubmit = false;
      }
    });
    this.setState({
      form: Object.assign({}, this.state.form, {
        [formName]: form,
      }),
      canSubmit,
    });
  };

  triggerDownload = (url: string) => {
    if (!url) {
      return;
    }
    this.props.startTemplateDownload();
    const a = document.createElement('a');
    a.href = url;
    a.click();
    this.timeoutId = setTimeout(() => this.props.finishTemplateDownload(), 3000);
  };

  render() {
    const { downloadData } = this.props;
    const { isLoaded, isRunning, downloadOptions } = downloadData;
    if (!isLoaded || isRunning) {
      return <Loading />;
    }
    return (
      <section>
        <DownloadSection
          downloadData={downloadData.data}
          form={this.state.form}
          canSubmit={this.state.canSubmit}
          requestDownloadTemplate={this.props.requestDownloadTemplate}
          handleChange={this.handleChange}
          productName={this.props.productName}
          downloadOptions={downloadOptions}
        />
      </section>
    );
  }
}

export default DownloadTemplate;
