// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, HelpIcon } from 'components/Icons';
import FileFormatIcon from 'components/FileFormatIcon';

type Props = {
  description: string
};

const UploadExtraInformationPanel = ({ description }: Props) => (
  <section className="available-upload-extra-info">
    <section className="delivery-information">
      <section className="icon">
        <CalendarIcon />
      </section>
      <section className="content">
        <span className="title">Prazo de entrega</span>
        <span className="description">{description}</span>
      </section>
    </section>
    <section className="template-information-container">
      <section className="icon">
        <HelpIcon />
      </section>
      <section className="content">
        <span className="title">Baixar gabarito deste produto</span>
        <section className="icon-list">
          <FileFormatIcon title="AI" />
          <FileFormatIcon title="EPS" />
          <FileFormatIcon title="PSD" />
        </section>
        <span className="description">Precisa de ajuda? <Link to="#">Clique aqui</Link></span>
      </section>
    </section>
  </section>
);

export default UploadExtraInformationPanel;
