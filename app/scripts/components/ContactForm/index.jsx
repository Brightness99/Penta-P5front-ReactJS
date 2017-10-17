// @flow
import React from 'react';
import type { DataType } from 'actions';
import { BlockTitle } from 'atoms/Titles';
import { Select } from 'atoms/Inputs/Select';
import { InputEmail, InputRegex } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';
import './ContactForm.styles.scss';


type FormType = {
  email: { valid: boolean, value: string },
  first_name: { valid: boolean, value: string },
  last_name: { valid: boolean, value: string },
  phone: { valid: boolean, value: string },
  empresa: { valid: boolean, value: string },
  website: { valid: boolean, value: string },
  spending: { valid: boolean, value: string },
};
type Props = { onSubmit: (data: DataType) => void }
type State = { canSubmit: boolean, form: FormType };

class ContactForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        email: { valid: false, value: '' },
        first_name: { valid: false, value: '' },
        last_name: { valid: false, value: '' },
        phone: { valid: false, value: '' },
        empresa: { valid: false, value: '' },
        website: { valid: false, value: '' },
        spending: { valid: false, value: '' },
        position: { valid: false, value: '' },
      },
      canSubmit: false,
    };
  }

  props: Props;
  state: State;

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.canSubmit) {
      const { onSubmit } = this.props;
      const { form } = this.state;

      if (typeof onSubmit === 'function') {
        const formData = Object.keys(form)
        .reduce((previousInput, nextInput) => ({
          ...previousInput,
          [nextInput]: form[nextInput].value,
        }), {});
        onSubmit(formData);
      }
    }
  }

  handleValidatedInput = (name, value, valid) => {
    const { form } = this.state;
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
  };

  render() {
    return (
      <section className="layout-contact__form">
        <BlockTitle>{'Quer Saber Mais?'}</BlockTitle>
        <h5 className="contact__form-subtitle">{'Preencha os campos abaixo:'}</h5>
        <form className="module-contact__form__container" onSubmit={(e) => this.handleSubmit(e)}>
          <InputEmail
            name="email"
            placeholder={'E-mail'}
            className="is-full__form-line"
            showLabel
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="first_name"
            name="first_name"
            type="text"
            placeholder={'Nome'}
            pattern={/.+/}
            className="is-half__form-line"
            showLabel
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="last_name"
            name="last_name"
            type="text"
            placeholder={'Sobrenome'}
            pattern={/.+/}
            className="is-half__form-line"
            showLabel
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="phone"
            name="phone"
            type="tel"
            pattern={/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/}
            placeholder={'Telefone'}
            className="is-half__form-line"
            showLabel
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="empresa"
            name="empresa"
            type="text"
            pattern={/.+/}
            placeholder={'Empresa'}
            className="is-half__form-line"
            showLabel
            onValidate={this.handleValidatedInput}
            required
          />
          <InputRegex
            id="website"
            name="website"
            pattern={/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/}
            type="text"
            placeholder={'Site da Empresa'}
            className="is-full__form-line"
            showLabel
            onValidate={this.handleValidatedInput}
            required
          />
          <Select
            id="spending"
            name="spending"
            className="is-half__form-line"
            showLabel={true}
            placeholder={'Orçamento mensal de marketing'}
            required
            onChange={this.handleValidatedInput}
          >
            <option value={5000}>{'Até R$ 5.000 ao mês'}</option>
            <option value={10000}>{'De R$ 5.001 a R$ 10.000 ao mês'}</option>
            <option value={50000}>{'De R$ 10.001 a R$ 50.000 ao mês'}</option>
            <option value={100000}>{'De R$ 50.001 a R$ 100.000 ao mês'}</option>
            <option value={100001}>{'Mais de R$ 100.000 ao mês'}</option>
          </Select>
          <Select
            id="position"
            name="position"
            className="is-half__form-line"
            placeholder={'Cargo na empresa'}
            showLabel={true}
            required
            onChange={this.handleValidatedInput}
          >
            <option value={1016}>{'Assistente'}</option>
            <option value={1017}>{'Auxiliar'}</option>
            <option value={1018}>{'Analista'}</option>
            <option value={1019}>{'Coordenador/Supervisor'}</option>
            <option value={1020}>{'Gerente'}</option>
            <option value={1021}>{'Diretor'}</option>
            <option value={1022}>{'Presidente/Dono'}</option>
            <option value={1023}>{'Consultor'}</option>
            <option value={1024}>{'Outros'}</option>
          </Select>
          <Button
            type="submit"
            kind="success"
            disabled={!this.state.canSubmit}
          >
            {'Enviar'}
          </Button>
        </form>
      </section>
    );
  }
}

export default ContactForm;
