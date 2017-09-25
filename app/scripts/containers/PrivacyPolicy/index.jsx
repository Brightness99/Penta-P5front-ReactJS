// @flow

import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class PrivacyPolicy extends React.Component {

  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Política de Privacidade',
      },
    ];
    return (
      <section>
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className="container">
          <div className="org-terms-use-privacy">
            <h2 className="title-terms-use-privacy">Política de privacidade</h2>

            <div className="mol-bg-terms-use-privacy">
              <p>A FM Impressos Personalizados Ltda., pessoa jurídica de direito privado, estabelecida na Avenida Cardeal Santiago Luís Copello, 221 - Vila Ribeiro de Barros - São Paulo/SP - CEP 05308-000, devidamente inscrita no CNPJ/MF sob nº 13.555.994/0001-54, daqui por diante denominada PRINTI, proprietária do SITE www.printi.com.br, estabelece através deste instrumento as regras a serem seguidas pelo Contratante, ou seja, as pessoas (físicas ou jurídicas) que acessarem o SITE para prestação de serviços de impressão digital. Este é um serviço destinado a pessoas que queiram imprimir seus arquivos em formato digital, utilizando como base o SITE. Ao acessar o SITE e também ao contratar a compra de serviços, o Contratante estará concordando com todos os termos e condições aqui dispostos.</p>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DO CADASTRO NO SITE:</h4>
                <ul className="qrk-list-text-terms">
                  <li>
                    <span>1)</span> Para os Contratantes que acessarem o SITE, a PRINTI, além das diversas informações contidas no SITE, oferecerá a prestação de serviços de impressão digital.
                  </li>
                  <li>
                    <span>2)</span> O SITE poderá ser acessado por pessoas físicas ou jurídicas. Com relação às pessoas físicas, para realizar a contratação de qualquer tipo de serviço, o Contratante deverá ter a idade superior a 18 (dezoito) ano, ou, caso seja menor, estes deverão estar representados por seus pais, tutores ou responsáveis.
                  </li>
                  <li>
                    <span>3)</span> O SITE poderá ser utilizado por pessoas físicas ou jurídicas, nacionais (brasileiros) ou estrangeiros, ficando claro que, por ser o negócio realizado em território nacional, vale a legislação vigente no País, para dirimir os casos de dúvidas ou conflitos.
                  </li>
                  <li>
                    <span>4)</span> O acesso e a visitação à página inicial do SITE, bem como a outras páginas serão realizadas sem qualquer necessidade de cadastro e senha. Entretanto, para a compra de serviços, é necessário que o Contratante preencha o CADASTRO e forneça seus dados cadastrais, sendo que este contrato se inicia com a compra dos serviços, por meio do SITE.
                  </li>
                  <li>
                    <span>5)</span> A PRINTI, periodicamente, fará verificações nos cadastros e excluirá os cadastros que contenham informações incorretas ou notadamente falsas, ficando o Contratante ciente deste procedimento.
                  </li>
                  <li>
                    <span>6)</span> O Contratante, em conformidade com os Termos de Serviço e Uso do Site, contidos neste documento, se obriga a fornecer informações verdadeiras, exatas, atuais e completas sobre si mesmo, preenchimento do registro no formulário específico para acesso ao serviço digital, bem como a conservar e atualizar imediatamente tais informações de registro para mantê-las verdadeiras, exatas, atuais e completas.
                  </li>
                  <li>
                    <span>7)</span> O Contratante desde já declara, sob as penas da lei, que todos os dados fornecidos são verdadeiros.
                  </li>
                  <li>
                    <span>8)</span> O Contratante fica ciente de que o acesso ou a contratação dos serviços do SITE, através do seu endereço de email ou nome do usuário e senha, implica automaticamente que o Contratante está assumindo todas as responsabilidades pelo seu uso.
                  </li>
                  <li>
                    <span>9)</span> Se qualquer informação fornecida pelo Contratante for falsa, incorreta, desatualizada ou incompleta, ou caso a PRINTI tenha razões suficientes e fundamentadas para suspeitar que tais informações sejam falsas, incorretas, desatualizadas ou incompletas, a PRINTI terá o direito de suspender ou cancelar imediatamente, independente de notificação, a solicitação de compra do serviço do Contratante, bem como qualquer futura contratação de serviço ou parte dele.
                  </li>
                  <li>
                    <span>10)</span> O Contratante deverá informar seu próprio endereço eletrônico a ser utilizado no SITE e recebimento de mensagens advindas de seu cadastro no referido SITE. O Contratante será inteiramente responsável por qualquer atividade que ocorra no âmbito de seu cadastro. O endereço eletrônico informado pelo Contratante será utilizado para sua identificação.
                  </li>
                  <li>
                    <span>11)</span> O Contratante se obriga a notificar imediatamente a PRINTI sobre qualquer uso não autorizado de seu login no SITE (identificação do Contratante para acesso ao SITE mediante o preenchimento de seu endereço eletrônico pessoal ou nome de usuário e senha) ou qualquer quebra de segurança de seu conhecimento. Concorda também em não deixar seu cadastro pessoal aberto no computador após entrar com seu endereço eletrônico no SITE, evitando, assim, o uso desautorizado por terceiros.
                  </li>
                  <li>
                    <span>12)</span> Faz parte da política da PRINTI respeitar a privacidade de seus Contratantes. O SITE não irá, portanto, monitorar, editar, acessar ou divulgar informações privativas de seus Contratantes sem autorização prévia, exceto nos casos expressamente previstos nos termos do presente ou a menos que a PRINTI seja obrigada a fazê-lo mediante ordem judicial ou por força de lei.
                  </li>
                  <li>
                    <span>13)</span> O cadastro do Contratante no SITE é gratuito.
                  </li>
                  <li>
                    <span>14)</span> O Contratante, juridicamente capaz, poderá solicitar a compra de serviços digitais através do SITE.
                  </li>
                  <li>
                    <span>15)</span> O Contratante deverá efetuar seu próprio cadastro no SITE, responsabilizando-se pela correção e veracidade dos dados informados e deverá manter o ambiente de seu computador seguro, com uso de ferramentas disponíveis como anti-virus e firewall, entre outras, atualizadas, de modo a contribuir na prevenção de riscos eletrônicos de sua parte
                  </li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DIREITOS E RESPONSABILIDADES DA PRINTI:</h4>
                <ul className="qrk-list-text-terms">
                  <li>
                    <span>16)</span> O Contratante fica ciente e autoriza, quando da realização do pedido, que a PRINTI possa efetuar cópias dos arquivos enviados por ele, sempre que necessário para a realização dos trabalhos e cumprimento da sua obrigação. A PRINTI tomará os cuidados normais para que os arquivos digitais, enviadas pelo Contratante não sejam acessados ou divulgados por terceiros ou para terceiros. Entretanto, o Contratante reconhece que durante o envio deste arquivo o mesmo pode estar sujeito a interceptação por terceiros ou ação de “hackers”, hipótese na qual a PRINTI não poderá ser responsabilizada por tratar-se de caso fortuito.
                  </li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DA UTILIZAÇÃO E RESPONSABILIDADES PELOS DADOS:</h4>
                <ul className="qrk-list-text-terms">
                  <li><span>17)</span> As informações prestadas pelo Contratante necessárias para a contratação dos serviços serão utilizadas apenas para os fins de cadastros, legais, tributários e objeto do presente instrumento, de modo que a PRINTI se compromete a não utilizar destas para quaisquer fins, como ainda de não divulgá-las ao público em geral, a não ser por determinação judicial.</li>
                  <li><span>18)</span> Entretanto, para fins estatísticos, a PRINTI poderá utilizar as informações fornecidas pelo Contratante, bem como o modo, fins e horários de utilização dos serviços e produtos disponibilizados pelo SITE.</li>
                  <li><span>19)</span> Em caso de alteração de qualquer um dos dados cadastrais informados pelo Contratante, estes deverão ser atualizados de imediato, ou estará o Contratante responsável por danos ou prejuízos que venham a ser causados à PRINTI ou a terceiros pela falta de atualização de seu cadastro junto a mesma, que pode implicar em entrega errada, não realização da entrega, entre outros.</li>
                  <li><span>20)</span> O Contratante responderá civil e criminalmente e pelos danos morais e materiais ou por qualquer prejuízo que venha a causar à PRINTI, em decorrência do não cumprimento ou do cumprimento irregular do presente instrumento, bem como por quaisquer danos que venha a causar a terceiros, por ato ou fato resultante da utilização em desacordo com os termos deste instrumento, ou declaração falsa que utilize.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
