// @flow

import React from 'react';
import SVG from 'react-inlinesvg';
import cx from 'classnames';

import { connect } from 'react-redux';
import { userNewsletterSignup } from 'actions';

type Props = {
  locale: LocaleNewsletter,
  newsletter: UserNewsletterStore,
  parent: string,
  dispatch: () => {},
};

type State = {
  canSubmit: boolean,
  isSubmitted: boolean,
};

export class Newsletter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false,
      isSubmitted: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { isSubmitted } = this.state;
    const { parent } = this.props;

    if (isSubmitted && nextProps.newsletter.component === parent && nextProps.newsletter.subscribed) {
      this.timeout = setTimeout(() => {
        this.setState({
          isSubmitted: false,
        });
      }, 7000);
    }
  }

  static timeout: number;

  static props: Props;

  static state: State;

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { parent, dispatch, locale } = this.props;
    const formData = new FormData(ev.target);

    this.setState({
      isSubmitted: true,
    });

    dispatch(userNewsletterSignup(formData.get('email'), parent, {
      FAILURE: locale.FAILURE,
      SUCCESS: locale.SUCCESS,
    }));
  };

  renderSignupMessage() {
    const { isSubmitted } = this.state;
    const { parent, newsletter } = this.props;
    let html;

    if (isSubmitted && newsletter.component === parent && newsletter.subscribed) {
      html = (
        <div className="has-success">
          {newsletter.message}
        </div>
      );
    } else if (newsletter.error) {
      html = (
        <div className="has-error">
          {newsletter.message}
        </div>
      );
    }

    return html;
  }

  handleChange = (ev) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({
      canSubmit: regex.test(ev.target.value),
    });
  };

  render() {
    const { locale } = this.props;
    const { canSubmit } = this.state;

    return (<div className="app__newsletter container">
      <div className="app__newsletter__icon">
        <SVG src={require('assets/media/svg/newsletter.svg')} />
      </div>
      <div className="app__newsletter__text">
        <h3>{locale.TITLE}</h3>
        <p>
          {locale.SUB_TITLE}
        </p>
      </div>
      <div className="app__newsletter__form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder={locale.PLACEHOLDER}
            onChange={this.handleChange}
          />
          <input
            className={
              cx(
                'app__newsletter__button',
                !canSubmit && 'app__newsletter__button--disabled'
              )
            }
            disabled={!canSubmit}
            type="submit"
            name="submit"
            value={locale.BUTTON}
          />
        </form>
        <div className="app__newsletter__form-message">
          {this.renderSignupMessage()}
        </div>
      </div>
    </div>);
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    locale: state.locale.translate.newsletter,
    newsletter: state.user.newsletter,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsletter);
