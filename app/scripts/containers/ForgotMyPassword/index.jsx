import React from 'react';
import { Link } from 'react-router-dom';
import ErrorField from 'components/ErrorField';
import { InputEmail, InputPassword } from 'quarks/Inputs/Validatable';
import { Button } from 'quarks/Inputs';

export class ForgotMyPassword extends React.Component {

  render() {
    return (
      <section className="tpl-forgot-password">
        <div className="container">
          <div className="mol-forgot-password">
            <h3 className="atm-title">Esqueci minha senha</h3>
            <hr />

            <p className="atm-subtitle">Digite seu e-mail no campo abaixo para recuperar sua senha:</p>
            <form action="">
              <InputEmail
                name="email"
                placeholder="E-mail"
                showLabel={true}
                onValidate={this.handleValidatedInput}
              />
              {/*<ErrorField message="Error" />*/}
              <Button
                type="submit"
                kind="success"
                // isLoading={isLoading}
                // disabled={!canSubmit}
              >
                Enviar
              </Button>
            </form>
            <p className="atm-back-login">Voltar e fazer <Link to="#">login</Link></p>
          </div>
        </div>
      </section>
    );
  }
}

export default ForgotMyPassword;
