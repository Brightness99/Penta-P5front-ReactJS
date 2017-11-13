import React from 'react';
import { CheckIcon } from 'components/Icons';
import { Link } from 'react-router-dom';

export class Work extends React.Component {
  render() {
    return (
      <section className="tpl-work-us">
        <div className="container">
          <div className="org-banner-work">
            <h2>Desafie. Quebre paradigmas. Inove todos os dias.</h2>
            <p>Trabalhar na Printi significa fazer o que você ama. Encontramos valor na simplicidade e na agilidade para atingirmos a excelência. Por isso, procuramos pessoas capazes de resolver problemas e nos ajude a construir algo realmente grande.</p>
            <Link to="#" className="btn-default btn-primary btn-sm">Ver vagas</Link>
          </div>

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

        <div className="org-we-search">
          <div className="container">
            <h3 className="title-we-search">As qualidades que buscamos</h3>
            <ul className="atm-skill-search">
              <li><CheckIcon /> Ousadia</li>
              <li><CheckIcon /> Criatividade</li>
              <li><CheckIcon /> Trabalho em equipe</li>
              <li><CheckIcon /> Pró-atividade</li>
              <li><CheckIcon /> Inovação</li>
              <li><CheckIcon /> Comprometimento</li>
            </ul>
          </div>
        </div>

        <div className="container">
          <div className="org-look-jobs">
            <h3 className="title-look-jobs">Confira nossas vagas disponíveis!</h3>
            <Link to="#" className="btn-default btn-primary btn-sm">Ver vagas</Link>
            <p className="desc-look-jobs">Atualmente, temos 5 vagas disponíveis. Candidate-se e boa sorte! ;)</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Work;
