// @flow

import React from 'react';

export class ContentText extends React.Component {
  render() {
    return (
      <div className="atm-content-file">
        <h3 className="title-content-file">Formatos de papel</h3>
        <p className="p-text-content-file">Criar um novo documento para impressão é simples, porém alguns detalhes devem ser sempre observados quanto à sua configuração. Iremos explicar esses detalhes neste tutorial. Com o programa aberto, vá ao Menu Superior > File [Arquivo] > New [Novo]. O bitmap é um conjunto de pixels (pontos) que carregam uma informação de cor, e é formado pela união desses pixels. A resolução, em DPI, mede a qualidade e nitidez de um bitmap. DPI (“dots per inch”) significa “pixels por polegada”. Quanto maior o DPI da imagem original, maior a definição e qualidade dessa imagem. Veja o exemplo abaixo:</p>
        <img src={require('assets/media/images/example-content-file.png')} alt="Example File" />
        <p className="p-text-content-file">Uma janela se abrirá onde você definirá todas as configurações do seu documento. Em primeiro lugar, defina um nome para o seu documento no campo Name [Nome] e em seguida, no campo Profile [Perfil] escolha a opção Print [Impressão].</p>
      </div>
    );
  }
}

export default ContentText;
