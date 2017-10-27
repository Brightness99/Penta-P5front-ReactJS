// @flow

import React from 'react';
import cx from 'classnames';

type Props = {
  handleModalShowing: () => void,
}

const BannerCloud = ({ handleModalShowing }: Props) => (
  <section>
    <section className="banner-corporate-sales">
      <article className={cx('container', 'banner-corporate-sales__section')}>
        <section className="text-banner">
          <h2 className="title-banner">{'Atendimento exclusivo'}</h2>
          <p className="desc-list-banner">
            {'Personalizado para atender as necessidades e demandas de clientes que:'}
          </p>
          <ul className="list-banner">
            <li>{'Fazem pedidos acima de '}<span>{'R$ 5mil'}</span></li>
            <li>{'Contam com mais de '}<span>{'50 funcionários'}</span></li>
            <li>{'Têm mais de '}<span>{'10 unidades ou franquias'}</span></li>
          </ul>
          <button
            className="btn-default btn-secondary btn-lg"
            onClick={handleModalShowing}
          >
            {'Solicitar Atendimento'}
          </button>
        </section>
      </article>
      <button
        className={cx('btn-default', 'btn-secondary', 'btn-lg', 'corporate-sales__modal-button')}
        onClick={handleModalShowing}
      >
        {'Solicitar Atendimento'}
      </button>
    </section>
  </section>
);

export default BannerCloud;
