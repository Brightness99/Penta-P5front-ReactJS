// @flow
import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs';
import { Input } from 'quarks/Inputs';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Select } from 'atoms/Inputs';
import { ErrorText } from 'atoms/Texts';
import { CheckBox } from 'components/Input';
import { NavLink, Link } from 'react-router-dom';
import { accountUpdate } from 'actions';

type Props = {
  screenSize: string,
  account: {},
  dispatch: () => {},
};

export class CustomerData extends React.Component {

  constructor(props) {
    super(props);

    const { account } = this.props;

    this.state = {
      ...account,
      current_password: '',
      new_password: '',
      new_password_repeat: '',
    };
  }

  static defaultProps = {
    screenSize: 'xs',
  };
  
  static props: Props;

  handleChangeName = (e) => {
    let names = e.target.value.split(' ');
    this.setState({
      first_name: names[0],
      last_name: names[1],
    });
  }

  handleClick = () => {
    const { dispatch } = this.props;

    let dataToUpdate = { ...this.state };
    if (dataToUpdate.current_password !== '' && dataToUpdate.new_password !== '' && dataToUpdate.new_password_repeat !== '') {
      dataToUpdate.change_password = {
        current_password: dataToUpdate.current_password,
        new_password: dataToUpdate.new_password,
        new_password_repeat: dataToUpdate.new_password_repeat
      };
    }

    dispatch(accountUpdate(dataToUpdate));
  }

  renderMobile() {

    const { account } = this.props;

    let errorMessage;
    if (account.error) {
      errorMessage = (
        <div className="mol-checkout-pane-footer">
          <ErrorText>{account.error.message}</ErrorText>
        </div>
      );
    }

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
                value={this.state.first_name + ' ' + this.state.last_name}
                onChange={this.handleChangeName}
              />
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                placeholder="CNPJ"
                value={this.state.cnpj}
                onChange={(e) => { this.setState({ cnpj: e.target.value }); }}
              />
              <Select
                className="atm-checkout-input atm-checkout-input-full"
                name="data-pane-gender"
                showLabel={true}
                id="data-pane-gender"
                placeholder="Nº de funcionários"
                required={true}
                value={this.state.employee_number}
                onChange={(e) => { this.setState({ employee_number: e.target.value }); }}
              >
                <option value={'0'}>de 2 a 19 funcionários</option>
                <option value={'1 '}>de 100 a 300 funcionários</option>
              </Select>
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full disabled"
                placeholder="Inscrição estadual"
                value={this.state.state_registration}
                onChange={(e) => { this.setState({ state_registration: e.target.value }); }}
              />
              <Input
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                placeholder="Telefone"
                value={this.state.phone}
                onChange={(e) => { this.setState({ phone: e.target.value }); }}
              />
              <InputEmail
                className="atm-checkout-input atm-checkout-input-full"
                name="email"
                placeholder="E-mail"
                showLabel={true}
                onValidate={this.handleValidatedInput}
                value={this.state.email}
                onChange={(e) => { this.setState({ email: e.target.value }); }}
              />
              <label className="atm-up-sell-checkbox atm-up-sell-checkbox--checked">
                <CheckBox value="123" />Isento de inscrição estadual
              </label>
            </form>

            <h4 className="title-changePass">Mudar senha</h4>
            <form className="org-checkout-content-data">
              <InputPassword
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                name="password"
                placeholder="Senha atual"
                onValidate={this.handleValidatedInput}
                value={this.state.current_password}
                onChange={(e) => { this.setState({ current_password: e.target.value }); }}
              />
              <InputPassword
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                name="password"
                placeholder="Nova senha"
                onValidate={this.handleValidatedInput}
                value={this.state.new_password}
                onChange={(e) => { this.setState({ new_password: e.target.value }); }}
              />
              <InputPassword
                showLabel={true}
                className="atm-checkout-input atm-checkout-input-full"
                name="password"
                placeholder="Confirme sua nova senha"
                onValidate={this.handleValidatedInput}
                value={this.state.new_password_repeat}
                onChange={(e) => { this.setState({ new_password_repeat: e.target.value }); }}
              />
            </form>

            {errorMessage}

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

    const { account } = this.props;

    let errorMessage;
    if (account.error) {
      errorMessage = (
        <div className="mol-checkout-pane-footer">
          <ErrorText>{account.error.message}</ErrorText>
        </div>
      );
    }

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
              value={this.state.first_name + ' ' + this.state.last_name}
              onChange={this.handleChangeName}
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="CNPJ"
              value={this.state.cnpj}
              onChange={(e) => { this.setState({ cnpj: e.target.value }); }}
            />
            <Select
              className="atm-checkout-input atm-checkout-input-one"
              name="data-pane-gender"
              showLabel={true}
              id="data-pane-gender"
              placeholder="Nº de funcionários"
              value={this.state.employee_number}
              onChange={(e) => { this.setState({ employee_number: e.target.value }); }}
              required={true}
            >
              <option value={'0'}>de 2 a 19 funcionários</option>
              <option value={'1 '}>de 100 a 300 funcionários</option>
            </Select>
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one disabled"
              placeholder="Inscrição estadual"
              value={this.state.state_registration}
              onChange={(e) => { this.setState({ state_registration: e.target.value }); }}
            />
            <Input
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              placeholder="Telefone"
              value={this.state.phone}
              onChange={(e) => { this.setState({ phone: e.target.value }); }}
            />
            <InputEmail
              className="atm-checkout-input atm-checkout-input-one"
              name="email"
              placeholder="E-mail"
              showLabel={true}
              value={this.state.email}
              onChange={(e) => { this.setState({ email: e.target.value }); }}
              onValidate={this.handleValidatedInput}
            />
            <label className="atm-up-sell-checkbox atm-up-sell-checkbox--checked">
              <CheckBox 
                checked={this.state.id_state_registration}
                onChange={(e) => { this.setState({ id_state_registration: e.target.checked }); }} />Isento de inscrição estadual
            </label>
          </form>

          <h4 className="title-changePass">Mudar senha</h4>
          <form className="org-checkout-content-data">
            <InputPassword
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              name="password"
              placeholder="Senha atual"
              onValidate={this.handleValidatedInput}
              value={this.state.current_password}
              onChange={(e) => { this.setState({ current_password: e.target.value }); }}
            />
            <InputPassword
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              name="password"
              placeholder="Nova senha"
              onValidate={this.handleValidatedInput}
              value={this.state.new_password}
              onChange={(e) => { this.setState({ new_password: e.target.value }); }}
            />
            <InputPassword
              showLabel={true}
              className="atm-checkout-input atm-checkout-input-one"
              name="password"
              placeholder="Confirme sua nova senha"
              onValidate={this.handleValidatedInput}
              value={this.state.new_password_repeat}
              onChange={(e) => { this.setState({ new_password_repeat: e.target.value }); }}
            />
          </form>

          {errorMessage}

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

function mapStateToProps(state) {
  return {
    account: state.account,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerData);

