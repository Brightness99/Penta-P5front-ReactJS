// @flow
import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Button } from 'quarks/Inputs';
import { Ninput } from 'components/Input';
import { accountAddressCreate, accountAddressUpdate, zipcodeValidate, accountAddressFormReset } from 'actions';

type Props = {
  account: {},
  onCloseModal: () => {},
  locale: {},
  dispatch: () => {},
  type: string,
  address: Object,
  isNew: boolean,
};

class AddressFormModal extends React.Component {

  constructor(props) {
    super(props);

    const { address, isNew } = props;

    this.state = {
      form: {
        receiver_name: { valid: !isNew, value: (address ? address.receiver_name : '') },
        zipcode: { valid: !isNew, value: (address ? address.zipcode : '') },
        city: { valid: !isNew, value: (address ? address.city : '') },
        neighborhood: { valid: !isNew, value: (address ? address.neighborhood : '') },
        state: { valid: !isNew, value: (address ? address.state : '') },
        street: { valid: true, value: (address ? address.street : '') },
        number: { valid: !isNew, value: (address ? address.number : '') },
        additional_address: { valid: !isNew, value: (address ? address.additional_address : '') },
      },
      canSubmit: !isNew,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { account: { zipcodeValid }, account } = nextProps;
    const { account: prevAccount, dispatch, onCloseModal } = this.props;
    const { form } = this.state;

    if (zipcodeValid !== prevAccount.zipcodeValid && !zipcodeValid.isRunning && zipcodeValid.isLoaded) {
      if (!zipcodeValid.error) {
        if (zipcodeValid.list) {
          const newCity = zipcodeValid.list.city ? zipcodeValid.list.city : form.city.value;
          const newNeighborhood = zipcodeValid.list.neighborhood ? zipcodeValid.list.neighborhood : form.neighborhood.value;
          const newAddressState = zipcodeValid.list.state ? zipcodeValid.list.state : form.state.value;
          const newStreet = zipcodeValid.list.street ? zipcodeValid.list.street : form.street.value;

          const newState = {
            ...form,
            city: {
              value: newCity,
              valid: !!newCity,
            },
            neighborhood: {
              value: newNeighborhood,
              valid: !!newNeighborhood,
            },
            state: {
              value: newAddressState,
              valid: !!newAddressState,
            },
            street: {
              value: newStreet,
              valid: !!newStreet,
            },
          };
          this.setState({
            form: newState,
          });
        }
      }
    }

    if (!account.addresses.isAddressSaving && account.addresses.isAddressSavingCalled) {
      dispatch(accountAddressFormReset());
      if (account.addresses.error) {
        swal({
          title: account.addresses.error.message,
          type: 'error',
          confirmButtonColor: '#2cac57',
          confirmButtonText: 'OK',
          showCancelButton: false,
        });
      } else {
        swal({
          title: 'Salvo com sucesso!',
          type: 'success',
          confirmButtonColor: '#2cac57',
          confirmButtonText: 'OK',
          showCancelButton: false,
        }).then(() => {
          if (onCloseModal) {
            onCloseModal();
          }
        });
      }
    }
  }

  static props: Props;

  handleCloseModal = () => {
    const { onCloseModal } = this.props;
    if (onCloseModal) {
      onCloseModal();
    }
  }

  handleClick = () => {
    const { dispatch, type, isNew, address } = this.props;
    const { form, canSubmit } = this.state;

    if (canSubmit) {
      const dataToSave = {
        receiver_name: form.receiver_name.value,
        zipcode: form.zipcode.value,
        city: form.city.value,
        neighborhood: form.neighborhood.value,
        state: form.state.value,
        street: form.street.value,
        number: form.number.value,
        additional_address: form.additional_address.value,
        type,
      };

      if (isNew) {
        dispatch(accountAddressCreate(dataToSave));
      } else {
        dataToSave.id = address.id;
        dispatch(accountAddressUpdate(dataToSave));
      }
    }
  }

  handleChange = (key, valid, value) => {
    const { form } = this.state;
    const { dispatch, locale } = this.props;
    const newState = { form };

    let canSubmit = true;
    newState.form[key].valid = valid;
    newState.form[key].value = value;
    Object.keys(newState.form)
    .forEach((index) => {
      if (newState.form[index].valid !== true) {
        canSubmit = false;
      }
    });
    this.setState({ form: newState.form, canSubmit });

    if (key === 'zipcode' && locale.COUNTRY_CODE === 'BR' && newState.form[key].valid) {
      dispatch(zipcodeValidate(newState.form[key].value));
    }
  }

  render() {
    const { account: { addresses, zipcodeValid }, locale } = this.props;
    const { form, canSubmit } = this.state;
    const pattern = locale.COUNTRY_CODE === 'BR' ? '99999-999' : '99999';

    return (
      <div className="address-form-modal-container">
        <h2>Adicionar endereço</h2>
        <div>* Campos Obrigatórios</div>
        <form className="address-form-modal">
          <Ninput
            name="receiver_name"
            key="address-form-receiver_name"
            className="atm-checkout-input atm-checkout-input-three"
            placeholder="Nome"
            value={form.receiver_name.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('receiver_name', isValid, value)}
            required
          />
          <div className="atm-checkout-input atm-checkout-input-two zipcode">
            <Ninput
              id="zipcode"
              name="zipcode"
              key="address-form-zipcode"
              placeholder="CEP"
              pattern={pattern}
              value={form.zipcode.value}
              onEnterKeyPress={this.handleClick}
              onChange={(isValid, value) => this.handleChange('zipcode', isValid, value)}
              checkValidation={this.checkZipCode}
              required
            />
            <a target="_blank" className="link" href="http://www.buscacep.correios.com.br/sistemas/buscacep/BuscaCepEndereco.cfm">Nao sei meu CEP*</a>
          </div>
          <Ninput
            name="additional_address"
            key="address-form-additional_address"
            className="atm-checkout-input atm-checkout-input-three"
            placeholder="Endereço"
            value={form.additional_address.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('additional_address', isValid, value)}
            required
          />
          <Ninput
            name="number"
            key="address-form-number"
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Numero*"
            value={form.number.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('number', isValid, value)}
            required
          />
          <Ninput
            name="street"
            key="address-form-street"
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Complemento"
            value={form.street.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('street', isValid, value)}
            required
          />
          <Ninput
            name="neighborhood"
            key="address-form-neighborhood"
            className="atm-checkout-input atm-checkout-input-two"
            placeholder="Bairro"
            value={form.neighborhood.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('neighborhood', isValid, value)}
            required
          />
          <Ninput
            name="city"
            key="address-form-city"
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Cidade"
            value={form.city.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('city', isValid, value)}
            required
          />
          <Ninput
            name="state"
            key="address-form-state"
            className="atm-checkout-input atm-checkout-input-two"
            placeholder="Estado"
            value={form.state.value}
            onEnterKeyPress={this.handleClick}
            onChange={(isValid, value) => this.handleChange('state', isValid, value)}
            required
          />
        </form>
        <div className="mol-checkout-pane-footer mol-address-pane-footer">
          <button className="atm-button-text" onClick={this.handleCloseModal}>CANCELAR</button>
          <Button type="submit" className="atm-send-button" onClick={this.handleClick} disabled={!canSubmit || (addresses.isAddressSaving && !addresses.isAddressSavingCalled) || (zipcodeValid.isRunning && !zipcodeValid.isLoaded)}>SALVAR ENDEREÇO</Button>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    locale: state.locale,
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressFormModal);
