// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, HelpIcon } from 'components/Icons';

const AvailableUploadExtraInfo = () => (
  <section className="available-upload-extra-info">
    <section className="delivery-information">
      <CalendarIcon />
      <section className="content">
        <span className="title">Prazo de entrega</span>
        <span className="description">A arte deve ser enviada até terça 24/11/16 às 14:00. Após esse período a data para a previsão de entrega será alterada.</span>
      </section>
    </section>
    <section className="template-information-container">
      <HelpIcon />
      <section className="content">
        <span className="title">Baixar gabarito deste produto</span>
        <section>
            icons
        </section>
        <span className="description">Precisa de ajuda? <Link to="#">Clique aqui</Link></span>
      </section>
    </section>
  </section>
  );

export default AvailableUploadExtraInfo;
