import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndPolicyBlock = () =>
  <section className="authentication__terms_and_policy">
    <span>Ao cadastrar você concorda com nossos <Link to="/termos-de-servico-e-uso-do-site">Termos de Uso</Link> e nossa <Link to="/politica-de-privacidade">Política de Privacidade</Link>.</span>
  </section>;


export default TermsAndPolicyBlock;
