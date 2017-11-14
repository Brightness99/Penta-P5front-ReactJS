import React from 'react';
import { Link } from 'react-router-dom';

export class BannerWork extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="org-banner-work">
          <div className="atm-texts-banner-work">
            <h2 className="title-banner-work">Desafie. Quebre paradigmas. Inove todos os dias.</h2>
            <p className="subtitle-banner-work">Trabalhar na Printi significa fazer o que você ama. Encontramos valor na simplicidade e na agilidade para atingirmos a excelência. Por isso, procuramos pessoas capazes de resolver problemas e nos ajude a construir algo realmente grande.</p>
            <Link to="#" className="btn-default btn-primary btn-sm">Ver vagas</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerWork;
