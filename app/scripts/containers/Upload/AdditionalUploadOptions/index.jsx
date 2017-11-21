// @flow

import React from 'react';
import AdditionalOption from './AdditionalUploadOption';

type Props = {
    options: {
      file_format: Array<{id: string, name: string}>,
      proof: Array<{id: string, name: string}>
    },
    defaultValues: {
      file_format: string,
      proof: string
    },
    handleOptionsChanged: (options: {}) => void
}

type State = {
  selectedOptions: {}
}

export default class AdditionalUploadOptions extends React.Component {
  constructor(props: Props) {
    super(props);

    const { handleOptionsChanged, defaultValues, options } = props;
    if (defaultValues.proof && defaultValues.file_format && typeof handleOptionsChanged === 'function') {
      const selectedOptions = {
        proof: options.proof.find(x => x.id === defaultValues.proof),
        file_format: options.file_format.find(x => x.id === defaultValues.file_format),
      };

      this.state = { selectedOptions };

      handleOptionsChanged(selectedOptions);
    }
  }

  props: Props;
  state: State;

  handleSelectedOption(value, title) {
    const { selectedOptions } = this.state;
    const { handleOptionsChanged } = this.props;
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[title] = value;

    this.setState({
      selectedOptions: newSelectedOptions,
    });
    if (newSelectedOptions.proof && newSelectedOptions.file_format && typeof handleOptionsChanged === 'function') {
      handleOptionsChanged(newSelectedOptions);
    }
  }

  render() {
    const { options, defaultValues } = this.props;
    return (
      <section className="additional-options-container">
        <AdditionalOption
          title="Formato do arquivo"
          video="youtube.com"
          options={options.file_format}
          defaultValue={defaultValues.file_format}
          handleOptionSelected={(value) => this.handleSelectedOption(value, 'file_format')}
        />
        <AdditionalOption
          title="Checagem do arquivo"
          video="youtube.com"
          options={options.proof}
          defaultValue={defaultValues.proof}
          handleOptionSelected={(value) => this.handleSelectedOption(value, 'proof')}
        />
      </section>
    );
  }
}
