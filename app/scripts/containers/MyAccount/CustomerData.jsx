// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { BoxRadio, Select } from 'atoms/Inputs';
import { CheckBox } from 'components/Input';
import { NavLink, Link } from 'react-router-dom';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, ArrowCarousel, PencilIcon, TrashIcon } from 'components/Icons';

//https://app.zeplin.io/project/595a8dc1d6dafa4574894a0f/screen/598a100d97dbb83115f41c4d
type Props = {
  screenSize: string,
};

export class CustomerData extends React.Component {

  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderMobile() {
    return (
      <div className="container-myData">
        <div className="container">
          <h2>Minha conta</h2>
          <h3 className="title-myData">Meus dados</h3>
          <div className="bg-mobile-myData">
            <form className="org-checkout-content-data">
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                placeholder="Nome Completo"
              />
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                placeholder="CNPJ"
              />
              <Select
                className="atm-checkout-input atm-checkout-input-full"
                name="data-pane-gender"
                showLabel={true}
                id="data-pane-gender"
                placeholder="Nº de funcionários"
                required={true}
              >
                <option value={'minimum'}>de 2 a 19 funcionários</option>
                <option value={'maximum '}>de 100 a 300 funcionários</option>
              </Select>
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full disabled"
                placeholder="Inscrição estadual"
              />
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                placeholder="Telefone"
              />
              <Input
                className="atm-checkout-input atm-checkout-input-full"
                name="email"
                placeholder="E-mail"
                showLabel={true}
              />
              <label className="atm-up-sell-checkbox atm-up-sell-checkbox--checked">
                <CheckBox value="123" />Isento de inscrição estadual
              </label>
            </form>

            <h4 className="title-changePass">Mudar senha</h4>
            <form className="org-checkout-content-data">
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                name="password"
                placeholder="Senha atual"
              />
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                name="password"
                placeholder="Nova senha"
              />
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                name="password"
                placeholder="Confirme sua nova senha"
              />
            </form>
            <div className="mol-checkout-pane-footer">
              <button value={2} onClick={this.handleClick} className="atm-send-button">Continuar</button>
            </div>

            <div className="container-changeDatas">
              <p className="text-changeDatas">Se quiser trocar para uma conta com dados de pessoa física, <Link to="#">clique aqui.</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDesktop() {
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Meus dados',
      },
    ];
    return (
      <div className="container-myData">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <div>
          <h3 className="title-myData">Meus dados</h3>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Nome Completo"
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="CNPJ"
            />
            <Select
              className="atm-checkout-input atm-checkout-input-one"
              name="data-pane-gender"
              showLabel={true}
              id="data-pane-gender"
              placeholder="Nº de funcionários"
              required={true}
            >
              <option value={'minimum'}>de 2 a 19 funcionários</option>
              <option value={'maximum '}>de 100 a 300 funcionários</option>
            </Select>
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one disabled"
              placeholder="Inscrição estadual"
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Telefone"
            />
            <Input
              className="atm-checkout-input atm-checkout-input-one"
              name="email"
              placeholder="E-mail"
              showLabel={true}
            />
            <label className="atm-up-sell-checkbox atm-up-sell-checkbox--checked">
              <CheckBox value="123" />Isento de inscrição estadual
            </label>
          </form>

          <h4 className="title-changePass">Mudar senha</h4>
          <form className="org-checkout-content-data">
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              name="password"
              placeholder="Senha atual"
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              name="password"
              placeholder="Nova senha"
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              name="password"
              placeholder="Confirme sua nova senha"
            />
          </form>
          <div className="mol-checkout-pane-footer">
            <NavLink className="atm-go-back-link" to="#">Cancelar</NavLink>
            <button value={2} onClick={this.handleClick} className="atm-send-button">Continuar</button>
          </div>

          <div className="container-changeDatas">
            <p className="text-changeDatas">Se quiser trocar para uma conta com dados de pessoa física, <Link to="#">clique aqui.</Link></p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default CustomerData;
