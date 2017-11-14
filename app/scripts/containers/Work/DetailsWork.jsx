import React from 'react';

export class DetailsWork extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="org-desc-work-us">
          <p>A Printi é uma empresa de e-commerce que atua no segmento gráfico-editorial com uma plataforma web-to-print <span className="span-blue">100% online</span> de fornecimento de material gráfico em tecnologia offset de impressão</p>
        </div>
        <div className="org-details-work-us">
          <div className="atm-left-details">
            <img src={require('assets/media/images/trabalhe-ambiente.png')} alt="Trabalhe em um ambiente agradável" />
          </div>
          <div className="atm-right-details">
            <h3 className="title-details">Trabalhe em um ambiente agradável</h3>
            <p className="text-details">Proporcionamos espaço físico e ambientes agradáveis para que nossos colaboradores sintam-se realizados e confortáveis. Nossas políticas e valores são muito bem definidos, visando oferecer condições para promoção, novos desafios, reconhecimento profissional e muito bom humor.</p>
          </div>
        </div>

        <div className="org-details-work-us">
          <div className="atm-left-details">
            <h3 className="title-details">Encontre pessoas inovadoras</h3>
            <p className="text-details">Acreditamos no aperfeiçoamento continuo de nossos colaboradores e gostamos de enfrentar novos desafios. Aqui você vai trabalhar com pessoas de diversas partes do mundo, com know-how especializado nas mais diversas áreas. Amamos o que fazemos e queremos crescer juntos.</p>
          </div>

          <div className="atm-right-details">
            <img src={require('assets/media/images/trabalhe-ambiente.png')} alt="Trabalhe em um ambiente agradável" />
          </div>
        </div>

        <div className="org-details-work-us">
          <div className="atm-left-details">
            <img src={require('assets/media/images/trabalhe-ambiente.png')} alt="Trabalhe em um ambiente agradável" />
          </div>

          <div className="atm-right-details">
            <h3 className="title-details">Participe de projetos importantes</h3>
            <p className="text-details">Na Printi você terá a oportunidade de participar de projetos de qualidade e obter grandes conquistas, demostrando todo o seu potencial. Não tenha medo de assumir riscos, pois procuramos e apoiamos pessoas como você, com habilidade e atitude. Estamos prontos para sermos os melhores no que fazemos.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailsWork;
