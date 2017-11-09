// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

const ExpiredResetLink = () => (
  <section className="container expired__container">
    <h3 className="expired__link-title">{'OOPS...'}</h3>
    <span className="expired__reasons-title">
      {'Esta solicitação para redefinição de senha não é válida! Algumas razões para isso podem ser:'}
    </span>
    <ul className="expired__reasons">
      <li>{'Você está acessando este link através de outro computador'}</li>
      <li>{'A solicitação expirou (cada uma tem prazo de 5h)'}</li>
      <li>{'Este link já foi utilizado para redefinir sua senha'}</li>
    </ul>
    <span className="expired__recommendations">
      {'Independente do motivo, recomendamos que você faça uma '}
      <NavLink
        to={'/esqueci-minha-senha'}
        className="expired__new-try"
      >
        {'nova tentativa'}
      </NavLink>
      {' se atentando aos pontos acima!'}
    </span>
  </section>
);

export default ExpiredResetLink;
