// @flow

import React from 'react';
import EyeIcon from 'components/Icons/Eye';
import EyeSlashIcon from 'components/Icons/EyeSlash';

type Props = {
  title: string,
  passwordValue?: string,
  confirmPasswordValue?: string,
  handleValidatedInput: (name: string, value: string, valid: boolean) => void,
  showPassword: boolean,
};

type State = {
  showPassword: boolean,
};

const EyeIconEnhancer = () => (WrappedComponent: ReactElement) =>
  class EyeIconEnhancerHOC extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);
      this.state = { showPassword: false };
    }

    static props: Props;
    static state: State;

    handleShowingPassword = () => {
      this.setState({
        showPassword: !this.state.showPassword,
      });
    };

    render() {
      const { showPassword } = this.state;
      return (
        <section>
          <WrappedComponent {...this.props} showPassword={showPassword} />
          <section className="show-password-block">
            <label className="eye-input-enhancer">
              <input
                type="checkbox"
                onChange={this.handleShowingPassword}
                value={showPassword}
                checked={showPassword}
              />
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              <span>{this.props.title}</span>
            </label>
          </section>
        </section>
      );
    }
  };

export default EyeIconEnhancer;
