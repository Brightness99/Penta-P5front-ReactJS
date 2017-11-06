// @flow
import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Button } from 'quarks/Inputs';
import { InputRegex, InputZipcode } from 'quarks/Inputs/Validatable';
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
    const { account: prevAccount, dispatch } = this.props;
    const { form } = this.state;

    if (zipcodeValid !== prevAccount.zipcodeValid && !zipcodeValid.isRunning && zipcodeValid.isLoaded) {
      if (!zipcodeValid.error) {
        if (zipcodeValid.list) {
          const newState = {
            ...form,
            city: {
              value: zipcodeValid.list.city || '',
              valid: !!zipcodeValid.list.city,
            },
            neighborhood: {
              value: zipcodeValid.list.neighborhood || '',
              valid: !!zipcodeValid.list.neighborhood,
            },
            state: {
              value: zipcodeValid.list.state || '',
              valid: !!zipcodeValid.list.state,
            },
            street: {
              value: zipcodeValid.list.street || '',
              valid: !!zipcodeValid.list.street,
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
          title: 'Alterações salvas com sucesso!',
          type: 'success',
          confirmButtonColor: '#2cac57',
          confirmButtonText: 'OK',
          showCancelButton: false,
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

  handleValidatedInput = (name, value, valid) => {
    const { form } = this.state;
    const { dispatch, locale } = this.props;
    const newState = { form };
    const target = name.target;
    const key = target ? target.id : name;

    let canSubmit = true;
    newState.form[key].valid = target ? !!target.value : valid;
    newState.form[key].value = target ? target.value : value;
    if (canSubmit === true) {
      Object.keys(newState.form)
      .forEach((index) => {
        if (newState.form[index].valid !== true) {
          canSubmit = false;
        }
      });
    }
    this.setState({ form: newState.form, canSubmit });

    if (key === 'zipcode' && locale.COUNTRY_CODE === 'BR' && newState.form[key].valid) {
      dispatch(zipcodeValidate(newState.form[key].value));
    }
  }

  render() {
    const { account: { addresses, zipcodeValid } } = this.props;
    const { form, canSubmit } = this.state;

    return (
      <div className="address-form-modal-container">
        <h2>Adicionar endereço</h2>
        <div>* Campos Obrigatórios</div>
        <form className="address-form-modal">
          <InputRegex
            id="receiver_name"
            name="receiver_name"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-three"
            placeholder="Nome*"
            value={form.receiver_name.value}
            onEnterKeyPress={this.handleClick}
            onValidate={this.handleValidatedInput}
            required
          />
          <div className="atm-checkout-input atm-checkout-input-two zipcode">
            <InputZipcode
              id="zipcode"
              name="zipcode"
              showLabel
              placeholder="CEP*"
              value={form.zipcode.value}
              onEnterKeyPress={this.handleClick}
              onValidate={this.handleValidatedInput}
              required
            />
            <a target="_blank" className="link" href="http://www.buscacep.correios.com.br/sistemas/buscacep/BuscaCepEndereco.cfm">Nao sei meu CEP*</a>
          </div>
          <InputRegex
            id="additional_address"
            name="additional_address"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-three"
            placeholder="Endereço*"
            value={form.additional_address.value}
            onEnterKeyPress={this.handleClick}
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="number"
            name="number"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Numero*"
            value={form.number.value}
            onEnterKeyPress={this.handleClick}
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="street"
            name="street"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Complemento"
            value={form.street.value}
            onValidate={this.handleValidatedInput}
            onEnterKeyPress={this.handleClick}
          />
          <InputRegex
            id="neighborhood"
            name="neighborhood"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-two"
            placeholder="Bairro*"
            value={form.neighborhood.value}
            onEnterKeyPress={this.handleClick}
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="city"
            name="city"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-two"
            placeholder="Cidade*"
            value={form.city.value}
            onEnterKeyPress={this.handleClick}
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="state"
            name="state"
            type="text"
            showLabel
            className="atm-checkout-input atm-checkout-input-one"
            placeholder="Estado*"
            value={form.state.value}
            onEnterKeyPress={this.handleClick}
            onValidate={this.handleValidatedInput}
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
