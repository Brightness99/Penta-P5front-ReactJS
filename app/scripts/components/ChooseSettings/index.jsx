// @flow
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { push } from 'modules/ReduxRouter';
import Button from 'quarks/Inputs/Button';
import { ChevronLeftIcon } from 'components/Icons';
import Loading from 'components/Loading';

import Settings from './Settings';

type Props = {
  id: string,
  finalProductName: string,
  fetchTemplateDetailsById: (id: string) => void,
  handleNavigation: (step: number) => void,
  effects: {
    isRunning: boolean,
    isLoaded: boolean,
  },
  sendDownloadRequest: (data: DownloadRequestFormType) => void,
  productParts: {
    [key: string]: ProductPartType,
  },
};

type State = {
  form: {
    [key: string]: {
      [key: string]: {
        valid: boolean, value: string
      },
    }
  },
  canSubmit: {
    [key: string]: boolean,
  },
};

const currentStep = 2;

class ChooseSettings extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      canSubmit: {},
      productPartsKeys: [],
    };
  }


  componentDidMount() {
    const { id, fetchTemplateDetailsById } = this.props;
    fetchTemplateDetailsById(id);
    this.props.handleNavigation(currentStep);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const productParts = nextProps.productParts;
    if (this.state.productPartsKeys.length === 0 && productParts) {
      this.setState({ productPartsKeys: Object.keys(productParts) });
    }
  }

  handleChange = (e: Event, combinationLength: number, formName: string) => {
    const { id, value } = e.currentTarget;
    const form = Object.assign({}, this.state.form[formName], {
      [id]: { value, valid: Boolean(value) },
    });

    const keys = Object.keys(form);
    let canSubmit = keys.length === combinationLength;
    keys.forEach(key => {
      const field = form[key];
      if (!field.valid) {
        canSubmit = false;
      }
    });

    this.setState({
      form: Object.assign({}, this.state.form, {
        [formName]: form,
      }),
      canSubmit: {
        ...this.state.canSubmit,
        [formName]: canSubmit,
      },
    });
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const { id, handleNavigation, sendDownloadRequest } = this.props;
    const data = this.state.productPartsKeys
    .map(key => ({
      [key]: {
        ...this.getFormValues(this.state.form[key]),
      },
    }))
    .reduce((a, b) => Object.assign({}, a, b));

    sendDownloadRequest(id, data);
    handleNavigation(currentStep + 1);
    push(`/download-de-gabaritos/${id.slice(1)}/baixar`);
  };

  getFormValues = (form: { [key: string]: { [key: string]: { valid: boolean, value: string } } }) => {
    const formValues = {};
    Object.keys(form)
    .forEach(key => {
      formValues[key] = form[key].value;
    });
    return formValues;
  };

  handleRemove = (partName: string) => {
    const { productPartsKeys, form, canSubmit } = this.state;
    const newForm = Object.assign({}, form);
    const newCanSubmit = Object.assign({}, canSubmit);
    delete newForm[partName];
    delete newCanSubmit[partName];

    this.setState({
      productPartsKeys: productPartsKeys.filter(part => part !== partName),
      form: newForm,
      canSubmit: newCanSubmit,
    });
  };

  static props: Props;
  static state: State;

  render() {
    const { effects, productParts, finalProductName } = this.props;
    const { isLoaded, isRunning } = effects;
    const { canSubmit, productPartsKeys, form } = this.state;

    if (!isLoaded || isRunning || !productParts) {
      return <Loading />;
    }
    const productPartsRaw = productPartsKeys
    .map(key => ({ key, data: productParts[key] }));

    const isFilledForm = Object.keys(form).length === productPartsKeys.length;
    const canSubmitForm = Object.keys(canSubmit)
    .map(key => canSubmit[key])
    .reduce((a, b) => a && b, isFilledForm);

    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h4 className={'final-product-name-title'}>
          {finalProductName.replace(/_/g, ' ')}
        </h4>
        {
          productPartsRaw.map((productPart, productPartIndex) =>
            <section
              // eslint-disable-next-line react/no-array-index-key
              key={`${productPart.data.name}-${productPartIndex}`}
            >
              {
                productPartsRaw.length > 1 &&
                <section className={'product-part-title-container'}>
                  <h5
                    className={'product-part-name-title'}
                  >
                    {productPart.data.name}
                  </h5>
                  <button
                    className={'setting-remove-control'}
                    onClick={() => this.handleRemove(productPart.key)}
                  >
                    {'Remover'}
                  </button>
                </section>
              }
              <Settings
                productPart={productPart}
                productPartName={productPart.key}
                form={this.state.form}
                handleChange={this.handleChange}
              />
            </section>,
          )
        }
        <nav className="org-links-choose-settings footer-page">
          <NavLink
            to={'/download-de-gabaritos'}
            className="atm-link"
          >
            <ChevronLeftIcon />{'Voltar para escolher outro produto'}
          </NavLink>
          <Button
            type="submit"
            kind="success"
            className="btn-default btn-primary btn-sm fnt-sbold"
            disabled={!canSubmitForm}
          >
            {'Continuar'}
          </Button>
        </nav>
      </form>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { detailedTemplates } = state.templates;
  const { isRunning, isLoaded } = detailedTemplates;
  return ({
    effects: {
      isRunning,
      isLoaded,
    },
    productParts: detailedTemplates[props.id],
  });
};

export default connect(mapStateToProps)(ChooseSettings);
