// @flow

import React from 'react';

class CloudCustomized extends React.Component {
  render() {
    return (
      <div className="org-cloud-customized">
        <div className="container">
          <div className="mol-cloud-customized">
            <p className="qrk-title-desc-customized">Simples, rápido e personalizado</p>

            <div className="atm-desc-customized">
              <div className="qrk-desc-text-customized">
                <img src={require('assets/media/images/img-brand.png')} alt="Nosso site, sua marca" />
                <div className="qrk-texts-details-customized">
                  <p className="title-details-customized">Nosso site, sua marca.</p>
                  <p className="subtitle-details-customized">Produtos exclusivos e padronizados, garantindo a identidade da sua marca.</p>
                </div>
              </div>
              <div className="qrk-desc-text-customized">
                <img src={require('assets/media/images/img-budget.png')} alt="Orçamento na hora" />
                <div className="qrk-texts-details-customized">
                  <p className="title-details-customized">Orçamento na hora</p>
                  <p className="subtitle-details-customized">Cotações instantâneas de acordo com as especificações de seus materiais.</p>
                </div>
              </div>
              <div className="qrk-desc-text-customized">
                <img src={require('assets/media/images/img-datas-customized.png')} alt="Dados Personalizados" />
                <div className="qrk-texts-details-customized">
                  <p className="title-details-customized">Dados personalizados</p>
                  <p className="subtitle-details-customized">Personalização de texto e imagem com visualização imediata na tela.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mol-cloud-customized">
            <p className="qrk-title-desc-customized">Processos simplificados</p>
            <div className="atm-desc-customized">
              <div className="qrk-desc-text-customized">
                <img src={require('assets/media/images/cloud-billing.png')} alt="Nosso site, sua marca" />
                <div className="qrk-texts-details-customized">
                  <p className="title-details-customized">Faturamento individualizado.</p>
                  <p className="subtitle-details-customized">Gerenciamento automático e escalável dos dados de cobrança da granquia, sem o envolvimento operacional do franqueador.</p>
                </div>
              </div>
              <div className="qrk-desc-text-customized">
                <img src={require('assets/media/images/cloud-extensive.png')} alt="Orçamento na hora" />
                <div className="qrk-texts-details-customized">
                  <p className="title-details-customized">Abrangência nacional</p>
                  <p className="subtitle-details-customized">Garanta entrega de seus impressos promocionais em todos território nacional através da nossa plataforma Cloud.</p>
                </div>
              </div>
              <div className="qrk-desc-text-customized">
                <img src={require('assets/media/images/cloud-production.png')} alt="Dados Personalizados" />
                <div className="qrk-texts-details-customized">
                  <p className="title-details-customized">Centralização da produção</p>
                  <p className="subtitle-details-customized">A centralização garante um padrão de qualidade constante para todos os impressos da rede, sem variação na impressão.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default CloudCustomized;
