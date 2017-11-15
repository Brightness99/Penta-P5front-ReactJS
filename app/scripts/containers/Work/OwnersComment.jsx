import React from 'react';

export class OwnersComment extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="org-owners-comments">
          <div className="atm-comment">
            <div className="qrk-comment">
              <p>“Nossa equipe é composta por pessoas de diversos países, o que nos dá diferentes pontos de vista sobre o negócio. Com isso, desafiamos e impulsionamos pessoas a mudanças positivas.”</p>
            </div>
            <div className="qrk-img-comment">
              <img src={require('assets/media/images/florian-hagenabuch.png')} alt="Florian Hagenabuch" />
              <p className="name-person-comment">Florian Hagenabuch</p>
              <p>CEO & Co-fundador</p>
            </div>
          </div>
          <div className="atm-comment">
            <div className="qrk-comment">
              <p>“Decidimos investir no Brasil já que este é um mercado com grande capacidade de desenvolvimento. Queremos inovar e acima de tudo ser referência na tecnologia Web2Print.”</p>
            </div>
            <div className="qrk-img-comment">
              <img src={require('assets/media/images/mate-pencz.png')} alt="Mate Pencz" />
              <p className="name-person-comment">Mate Pencz</p>
              <p className="name-position-comment">CEO & Co-fundador</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnersComment;
