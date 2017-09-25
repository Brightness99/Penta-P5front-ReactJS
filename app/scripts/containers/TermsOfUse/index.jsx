// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  dispatch: () => {},
};

export class TermsOfUse extends React.Component {

  static props: Props;

  render() {
    const { app: { screenSize } } = this.props;
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Termos de Uso',
      },
    ];
    return (
      <section>
        {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
        <div className="container">
          <div className="org-terms-use-privacy">
            <h2 className="title-terms-use-privacy">termos de serviço e uso do site</h2>

            <div className="mol-bg-terms-use-privacy">
              <p>A FM Impressos Personalizados Ltda., pessoa jurídica de direito privado, estabelecida na Avenida Cardeal Santiago Luís Copello, 221 - Vila Ribeiro de Barros - São Paulo/SP - CEP 05308-000, devidamente inscrita no CNPJ/MF sob nº 13.555.994/0001-54, daqui por diante denominada PRINTI, proprietária do SITE www.printi.com.br, estabelece através deste instrumento as regras a serem seguidas pelo Contratante, ou seja, as pessoas (físicas ou jurídicas) que acessarem o SITE para prestação de serviços de impressão digital. Este é um serviço destinado a pessoas que queiram imprimir seus arquivos em formato digital, utilizando como base o SITE. Ao acessar o SITE e também ao contratar a compra de serviços, o Contratante estará concordando com todos os termos e condições aqui dispostos.</p>

              <div className="atm-terms-use-privacy">
                <h3 className="title-text-terms">OBJETO:</h3>
                <ul className="qrk-list-text-terms">
                  <li>
                    <span>1)</span> O objeto do presente instrumento consiste em estabelecer a política e regulamento para o acesso do SITE; para o cliente que faça o cadastro; para que efetue as compras, através do SITE, de serviços de impressão digital, de pré-impressão, de produtos personalizados com impressão terceirizada; confirma a posse de direito de propriedade; estabelece regras quanto a possíveis indenizações; quanto à rescisão; sobre modificação dos termos do serviço, condições gerais e cobertura da garantia, bem como dicas de segurança.
                  </li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DO CADASTRO NO SITE:</h4>
                <ul className="qrk-list-text-terms">
                  <li>
                    <span>2)</span> Para os Contratantes que acessarem o SITE, a PRINTI, além das diversas informações contidas no SITE, oferecerá a prestação de serviços de impressão digital.
                  </li>
                  <li>
                    <span>3)</span> O SITE poderá ser acessado por pessoas físicas ou jurídicas. Com relação às pessoas físicas, para realizar a contratação de qualquer tipo de serviço, o Contratante deverá ter a idade superior a 18 (dezoito) ano, ou, caso seja menor, estes deverão estar representados por seus pais, tutores ou responsáveis.
                  </li>
                  <li>
                    <span>4)</span> O SITE poderá ser utilizado por pessoas físicas ou jurídicas, nacionais (brasileiros) ou estrangeiros, ficando claro que, por ser o negócio realizado em território nacional, vale a legislação vigente no País, para dirimir os casos de dúvidas ou conflitos.
                  </li>
                  <li>
                    <span>5)</span> O acesso e a visitação à página inicial do SITE, bem como a outras páginas serão realizadas sem qualquer necessidade de cadastro e senha. Entretanto, para a compra de serviços, é necessário que o Contratante preencha o CADASTRO e forneça seus dados cadastrais, sendo que este contrato se inicia com a compra dos serviços, por meio do SITE.
                  </li>
                  <li>
                    <span>6)</span> A PRINTI, periodicamente, fará verificações nos cadastros e excluirá os cadastros que contenham informações incorretas ou notadamente falsas, ficando o Contratante ciente deste procedimento.
                  </li>
                  <li>
                    <span>7)</span> O Contratante, em conformidade com os Termos de Serviço e Uso do Site, contidos neste documento, se obriga a fornecer informações verdadeiras, exatas, atuais e completas sobre si mesmo, preenchimento do registro no formulário específico para acesso ao serviço digital, bem como a conservar e atualizar imediatamente tais informações de registro para mantê-las verdadeiras, exatas, atuais e completas.
                  </li>
                  <li>
                    <span>8)</span> O Contratante desde já declara, sob as penas da lei, que todos os dados fornecidos são verdadeiros.
                  </li>
                  <li>
                    <span>9)</span> O Contratante fica ciente de que o acesso ou a contratação dos serviços do SITE, através do seu endereço de email ou nome do usuário e senha, implica automaticamente que o Contratante está assumindo todas as responsabilidades pelo seu uso
                  </li>
                  <li>
                    <span>10)</span> Se qualquer informação fornecida pelo Contratante for falsa, incorreta, desatualizada ou incompleta, ou caso a PRINTI tenha razões suficientes e fundamentadas para suspeitar que tais informações sejam falsas, incorretas, desatualizadas ou incompletas, a PRINTI terá o direito de suspender ou cancelar imediatamente, independente de notificação, a solicitação de compra do serviço do Contratante, bem como qualquer futura contratação de serviço ou parte dele.
                  </li>
                  <li>
                    <span>11)</span> O Contratante deverá informar seu próprio endereço eletrônico a ser utilizado no SITE e recebimento de mensagens advindas de seu cadastro no referido SITE. O Contratante será inteiramente responsável por qualquer atividade que ocorra no âmbito de seu cadastro. O endereço eletrônico informado pelo Contratante será utilizado para sua identificação.
                  </li>
                  <li>
                    <span>12)</span> O Contratante se obriga a notificar imediatamente a PRINTI sobre qualquer uso não autorizado de seu login no SITE (identificação do Contratante para acesso ao SITE mediante o preenchimento de seu endereço eletrônico pessoal ou nome de usuário e senha) ou qualquer quebra de segurança de seu conhecimento. Concorda também em não deixar seu cadastro pessoal aberto no computador após entrar com seu endereço eletrônico no SITE, evitando, assim, o uso desautorizado por terceiros. mediante ordem judicial ou por força de lei.
                  </li>
                  <li>
                    <span>13)</span> Faz parte da política da PRINTI respeitar a privacidade de seus Contratantes. O SITE não irá, portanto, monitorar, editar, acessar ou divulgar informações privativas de seus Contratantes sem autorização prévia, exceto nos casos expressamente previstos nos termos do presente ou a menos que a PRINTI seja obrigada a fazê-lo mediante ordem judicial ou por força de lei.
                  </li>
                  <li>
                    <span>14)</span> O cadastro do Contratante no SITE é gratuito.
                  </li>
                  <li>
                    <span>15)</span> O Contratante, juridicamente capaz, poderá solicitar a compra de serviços digitais através do SITE.
                  </li>
                  <li >
                    <span>16)</span> O Contratante deverá efetuar seu próprio cadastro no SITE, responsabilizando-se pela correção e veracidade dos dados informados e deverá manter o ambiente de seu computador seguro, com uso de ferramentas disponíveis como anti-virus e firewall, entre outras, atualizadas, de modo a contribuir na prevenção de riscos eletrônicos de sua parte.            
                  </li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DOS PREÇOS E ENTREGA DOS PRODUTOS:</h4>
                <ul className="qrk-list-text-terms">
                  <li>
                    <span>17)</span> Os serviços serão entregues no endereço fornecido pelo Contratante, no momento do pedido dos serviços, sendo que será cobrado o valor do frete.
                  </li>
                  <li>
                    <span>18)</span> No momento da confirmação do pedido será informado o valor total do serviço e o valor do frete, caso haja, e é este o valor que é considerado válido para fins das obrigações assumidas e estabelecidas na contratação.
                  </li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DA UTILIZAÇÃO E RESPONSABILIDADES PELOS DADOS:</h4>
                <ul className="qrk-list-text-terms">
                  <li><span>19)</span> Concomitantemente à confirmação do pedido será gerada a forma de pagamento para os serviços adquiridos pelo Contratante.</li>
                  <li><span>20)</span> O prazo para pagamento será sempre à vista para modalidade de boleto bancário e débito em conta, podendo ser à vista ou a prazo (quando aplicável) para a modalidade de pagamento através de cartão de crédito. O serviço e a sua entrega somente serão efetuados após a confirmação do pagamento. Caso o pagamento não seja efetuado ou a transação seja recusada por qualquer motivo que seja, o pedido em questão será cancelado. Uma vez efetuado o pagamento, o Contratante deverá anexar o arquivo do objeto do serviço.</li>
                  <li><span>21)</span> O prazo para produção dos serviços solicitados será aquele constante no momento que o pedido foi liberado para produção, após a confirmação do pagamento e do correto envio do arquivo pelo Contratante. O prazo de frete não está incluso no prazo de produção e corre por conta e risco do Contratante.</li>
                  <li><span>22)</span> A entrega será efetuada pelos Correios ou por transportador particular, preferencialmente em dias úteis e no horário das 09:00 às 22:00, a depender do tipo de transporte. A entrega será efetuada para o Contratante ou para outra pessoa que estiver no endereço indicado pelo Contratante para receber, desde que não tenha sido desautorizada expressamente pelo Contratante. O protocolo no canhoto da nota fiscal servirá como comprovação da entrega dos serviços conforme solicitado.</li>
                  <li><span>23)</span> O Contratante deverá preencher corretamente os dados para entrega a fim de evitar atrasos.</li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DIREITOS E RESPONSABILIDADES DA PRINTI:</h4>
                <ul className="qrk-list-text-terms">
                  <li><span>24)</span> A PRINTI reserva-se o direito de, a qualquer momento realizar promoções para a venda de seus serviços. As promoções serão sempre por prazo determinado e poderão ser canceladas a qualquer tempo, a critério da PRINTI.</li>
                  <li><span>25)</span> Após efetuado o pagamento do serviço solicitado, o Contratante não mais poderá desistir da sua realização, vez que o serviço é personalizado e destinado especialmente a ele, motivo pelo qual, vindo a desistir do serviço, não haverá devolução da quantia paga. Caso a produção do serviço não tenha sido iniciada, será gerado um bônus da quantia paga, descontadas eventuais despesas realizadas, a ser utilizado em outro serviço pelo Contratante.</li>
                  <li><span>26)</span> Qualquer problema com os serviços solicitados deverá ser resolvido pelo Contratante, diretamente com a PRINTI. O Contratante reconhece e tem total ciência de que o SITE constitui-se em um mero instrumento divulgador do serviço, onde se disponibilizam informações para realização desta operação comercial.</li>
                  <li><span>27)</span> A PRINTI reserva-se o direito de não realizar serviços cujos arquivos contenham conteúdo pornográfico, discriminatório, profano, ofensivo, que atentem à moral e aos bons costumes, bem como outros que, a seu critérios possam gerar ações indenizatórias ou prejudicar terceiros, ou que se constituam em crime ou contravenção penal.</li>
                  <li><span>28)</span> Contratante fica ciente e autoriza, quando da realização do pedido, que a PRINTI possa efetuar cópias dos arquivos enviados por ele, sempre que necessário para a realização dos trabalhos e cumprimento da sua obrigação. A PRINTI tomará os cuidados normais para que os arquivos digitais, enviadas pelo Contratante não sejam acessados ou divulgados por terceiros ou para terceiros. Entretanto, o Contratante reconhece que durante o envio deste arquivo o mesmo pode estar sujeito a interceptação por terceiros ou ação de “hackers”, hipótese na qual a PRINTI não poderá ser responsabilizada por tratar-se de caso fortuito.</li>
                  <li><span>29)</span> A responsabilidade da PRINTI está limitada somente à realização do serviço, à produção do mesmo dentro do prazo e nas condições acordadas, com o padrão de qualidade acordado. A PRINTI não responderá por quaisquer outras despesas quer sejam diretas ou indiretas, incluindo aqui perdas e danos, honorários, indenizações etc.</li>
                  <li><span>30)</span> O Contratante terá o dever de cuidar para que os arquivos enviados estejam em total conformidade técnica com as dicas especiais constantes nas páginas do SITE e que é responsabilidade do Contratante o preparo dos arquivos e a conferência das especificações técnicas.</li>
                  <li><span>31)</span> O Contratante reconhece e concorda que o conteúdo, incluindo, sem limitação, textos, programas de software, musicas, sons, fotografias, gráficos, vídeos ou outros materiais contidos em propagandas disponíveis no serviço oferecido, bem como as informações divulgadas ao Contratante através do serviço ou de anunciantes, podem estar protegidos por direitos autorais, de imagens, marcas, patentes ou outros direitos de propriedade intelectual e legislação aplicável.</li>
                  <li><span>32)</span> O Contratante reconhece e concorda que somente poderá utilizar tais materiais e informações conforme expressamente autorizado pelos anunciantes ou por quem de direito para fazê-lo, e não poderá copiar, reproduzir, transmitir, distribuir ou criar obras derivadas a partir de tais materiais ou informações sem autorização expressa do respectivo proprietário.</li>
                  <li><span>33)</span> O Contratante isenta a PRINTI, seus diretores e empregados, de quaisquer perdas, despesas, danos, reclamações ou reivindicações, incorridos por quaisquer terceiros ou sofridos pela PRINTI com relação ou em decorrência de qualquer uso ou transmissão que ocorra sob endereço eletrônico e senha do Contratante (login do Contratante no SITE) e que viole os termos do serviço oferecido/solicitado, quaisquer leis ou regulamentos locais, nacionais ou internacionais aplicáveis, ou quaisquer direitos de terceiros, sem prejuízo de eventuais indenizações decorrentes.</li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DA RESCISÃO:</h4>
                <ul className="qrk-list-text-terms">
                  <li><span>34)</span> A PRINTI poderá cancelar o acesso dos Contratantes aos serviços oferecidos como um todo ou a qualquer parte deste, a qualquer momento, com ou sem motivo, com ou sem aviso prévio, a critério exclusivo da PRINTI.</li>
                  <li><span>35)</span> Se o Contratante desejar encerrar seu cadastro, simplesmente deverá enviar um email para o endereço de suporte da PRINTI, sendo que esta não será responsável por manter qualquer conteúdo vinculado ao cadastro do Contratante.</li>
                  <li><span>36)</span> A PRINTI reserva-se o direito de modificar ou descontinuar os serviços oferecidos, independentemente de notificação ao Contratante, antes da contratação dos serviços.</li>
                  <li><span>37)</span> A PRINTI poderá enviar avisos de promoções e informações sobre novos serviços etc. Esta comunicação poderá ser feita por mala direta, contato telefônico, contato no celular, envio de email, envio de SMS, envio de MMS, e outras formas que venham a ser criadas ou disponibilizadas.</li>
                  <li><span>38)</span> A PRINTI poderá eventualmente modificar os termos do serviço oferecido, sendo o Contratante notificado através das especificações técnicas de cada produto. A contratação do serviço pelo Contratante após tais modificações, será entendida como concordância com a modificação efetuada.</li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DA UTILIZAÇÃO E RESPONSABILIDADES PELOS DADOS:</h4>
                <ul className="qrk-list-text-terms">
                  <li><span>39)</span> As informações prestadas pelo Contratante necessárias para a contratação dos serviços serão utilizadas apenas para os fins de cadastros, legais, tributários e objeto do presente instrumento, de modo que a PRINTI se compromete a não utilizar destas para quaisquer fins, como ainda de não divulgá-las ao público em geral, a não ser por determinação judicial.</li>
                  <li><span>40)</span> Entretanto, para fins estatísticos, a PRINTI poderá utilizar as informações fornecidas pelo Contratante, bem como o modo, fins e horários de utilização dos serviços e produtos disponibilizados pelo SITE.</li>
                  <li><span>41)</span> Em caso de alteração de qualquer um dos dados cadastrais informados pelo Contratante, estes deverão ser atualizados de imediato, ou estará o Contratante responsável por danos ou prejuízos que venham a ser causados à PRINTI ou a terceiros pela falta de atualização de seu cadastro junto a mesma, que pode implicar em entrega errada, não realização da entrega, entre outros.</li>
                  <li><span>42)</span> O Contratante responderá civil e criminalmente e pelos danos morais e materiais ou por qualquer prejuízo que venha a causar à PRINTI, em decorrência do não cumprimento ou do cumprimento irregular do presente instrumento, bem como por quaisquer danos que venha a causar a terceiros, por ato ou fato resultante da utilização em desacordo com os termos deste instrumento, ou declaração falsa que utilize.</li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">POLÍTICA DE TROCAS E DEVOLUÇÕES:</h4>  
                <ul className="qrk-list-text-terms">
                  <li><span>43)</span> A tolerância do eventual descumprimento de quaisquer das cláusulas e condições do presente contrato não constituirá novação das obrigações aqui estipuladas e tampouco impedirá ou inibirá a exigibilidade das mesmas a qualquer tempo.</li>
                  <li><span>44)</span> A PRINTI não será responsabilizada, caso o conteúdo dos arquivos enviados estejam com problemas de correção dos textos, nomes, telefones, erros ortográficos e outros itens que compõem a arte, bem como não seguir as dicas de qualidade informadas no SITE, para que a produção esteja perfeita e o trabalho não seja perdido.</li>
                  <li><span>45)</span> A PRINTI assegura a reimpressão dos arquivos enviados, nos casos em que se comprovem defeitos exclusivos no processo de impressão. O cliente poderá solicitar a substituição dos produtos que julgar com defeito, respeitadas as variações decorrentes do processo de produção e impressão das gráficas, conforme o artigo 18 do Código de Defesa do Consumidor.</li>
                  <li><span>46)</span> A PRINTI não garante fidelidade de cores em nenhuma hipótese. Os impressos poderão apresentar variação de intensidade e tonalidade das cores, em relação ao monitor ou à prova impressa, bem como em relação às reimpressões. Os impressos poderão apresentar variação de tonalidade e/ou intensidade dentro do mesmo lote, não caracterizando defeito de impresso, os desvios de cores entre duas ou mais ordens, em comparação com uma ordem antiga, entre folhas soltas, os limites de tolerância nos cortes ou dobras, os formatos acabados, em todos os materiais, de 3mm de variação máxima.</li>
                  <li><span>47)</span> Poderá ocorrer variação de até 10% nas cores entre os primeiros e últimos impressos do mesmo arquivo no mesmo lote, não caracterizando defeito de impressão.</li>
                  <li><span>48)</span> Todos os pedidos são impressos com até 10% de variação, para mais ou para menos, sendo efetuada uma triagem manual para remoção da maioria dos impressos defeituosos. Eventualmente algumas unidades de impressos defeituosos poderão ser embaladas nos pacotes, não caracterizando a necessidade de reimpressão.</li>
                  <li><span>49)</span> Caso seja constatada durante a triagem que, por qualquer motivo, a perda do material foi inferior a 30%, não será feita a reimpressão. Só será efetuada reimpressão por quantidade quando a falta do material for superior a 30% do total.</li>
                  <li><span>50)</span> Para todos os casos, a devolução total do material defeituoso é obrigatória para que se proceda com a análise e possível reimpressão. Os produtos deverão ser devolvidos, em sua embalagem original, sem indícios de uso e nas mesmas condições que forem recebidas. Se após análise ficar constatado que não houve defeito no processo de impressão, o material será enviado novamente para o cliente, não será realizado reembolso ou crédito para uma futura compra.</li>
                  <li><span>51)</span> Para iniciar o processo de devolução e análise do material, entre em contato com um de nossos canais de atendimento, em <Link to="/central-de-ajuda" target="_blank">https://www.printi.com.br/central-de-ajuda</Link>. O prazo para análise é de 5 dias úteis, a contar da chegada do produto na PRINTI.</li>
                  <li><span>52)</span> O prazo para reclamações de eventuais defeitos é de 10 dias corridos da data da finalização da produção do pedido, exceto quando às quantidades, que deverá ser reclamada no ato da retirada ou entrega. Não aceitamos reclamações após este prazo.</li>
                  <li><span>53)</span> Não faremos reimpressão por causa de rigidez do papel.</li>
                </ul>
              </div>

              <div className="atm-terms-use-privacy">
                <h4 className="title-text-terms">DAS DISPOSIÇÕES GERAIS:</h4>
                <ul className="qrk-list-text-terms">
                  <li><span>54)</span> A PRINTI realiza somente serviços e produtos gráficos para usos promocionais. O Contratante declara que os produtos não serão comercializados no mercado. Qualquer tentativa de burlar essa norma será caracterizada como crime de falsidade ideológica.</li>
                  <li><span>55)</span> Ao solicitar a compra do serviço, o Contratante deverá declarar, sob as penas da Lei, que é o proprietário do arquivo e dos direitos a ele inerentes, cujo serviço está sendo solicitado, e desta forma, está expressamente autorizado, e que, no caso do trabalho conter pessoa ou lugares os quais dependam de autorização, estas foram obtidas, bem como que os serviços não serão utilizados para alterarem a realidade dos fatos e assim prejudicarem terceiros, seja em processos judiciais ou em que âmbito for.</li>
                  <li><span>56)</span> As declarações acima a serem prestadas pelo Contratante deverão ser verdadeiras, estando este sujeito às penas das leis civis e criminais, por falsa informação ou pelas consequências oriundas do seu ato praticado.</li>
                  <li><span>57)</span> A PRINTI tem um ambiente tecnológico seguro. A comunicação entre o computador do Contratante e a PRINTI,durante o procedimento de cadastro e/ou alteração de dados cadastrais e senha utilizam criptografia padrão, e protocolo SSL – Secure Sockets Layer. No entanto, nenhuma transmissão de dados através da Internet é totalmente segura. Assim, apesar dos esforços da PRINTI para garantir a privacidade de seus dados, tanto no armazenamento quanto na transmissão dos mesmos, a PRINTI não pode garantir total segurança.</li>
                  <li><span>58)</span> O presente instrumento constitui o acordo integral entre as partes, prevalecendo sobre qualquer outro entendimento firmado anteriormente.</li>
                  <li><span>59)</span> O Contratante compromete-se a não ingressar nas imagens de outros Contratantes, seja violando ou não o sistema de segurança, sob pena de responder civil e criminalmente pelos danos causados.</li>
                  <li><span>60)</span> Todas as notificações a qualquer das partes devem ser feitas por escrito, via e-mail ou correio convencional. A PRINTI poderá divulgar notificações ou mensagens através do SITE para informar o Contratante de mudanças no serviço ou termos do serviço, ou outros assuntos relevantes.</li>
                  <li><span>61)</span> O SITE apresentará a relação de serviços disponíveis, onde estará constando o valor de cada um,sendo que o Contratante escolherá o tipo de serviço que deseja. A informação de preço pode ser alterada sem aviso prévio, sendo considerada válida a informação do momento de solicitação do serviço. Por este motivo, o Contratante deve sempre consultar o valor final atualizado na tela do SITE, e que irá constar no momento do pedido.</li>
                  <li><span>62)</span> O SITE somente executará serviços provenientes de arquivos digitais, estando claro que o Contratante, para isto deverá ter acesso a internet, por sua conta e risco.</li>
                  <li><span>63)</span> A PRINTI reserva-se do direito de a qualquer momento alterar o disposto neste instrumento, mediante a disponibilidade na página inicial do SITE.</li>
                  <li><span>64)</span> A PRINTI é a titular da marca, logotipo, logomarca e endereço utilizados neste SITE, sendo-lhe assegurados todos os direitos sobre os mesmos.</li>
                  <li><span>65)</span> Adicionalmente, a PRINTI é titular de todas as informações, documentos, imagens e materiais contidos no SITE: Assim, a reprodução, armazenamento, desses materiais sujeitará o Contratante às penas da lei.</li>
                  <li><span>66)</span> O presente contrato não configura qualquer forma de sociedade, vínculo, parceria, de fato ou de direito, entre as partes, inexistindo solidariedade entre elas, e não estando as mesmas autorizadas a representar ou assumir obrigações uma em nome da outra.</li>
                  <li><span>67)</span> Com o pedido de compra no SITE, tem início este contrato, demonstrando que o Contratante aceita as condições estipuladas neste instrumento, que deverão ser observadas e seguidas pelo Contratante até a entrega dos produtos e efetuado o pagamento devido, sendo que, com o pagamento total dos pedidos, este ato colocará termo final ao contrato.</li>
                  <li><span>68)</span> Os termos do serviço e o relacionamento entre as partes serão regidos e interpretados no idioma português e de acordo com as leis da Republica Federativa do Brasil, sem consideração a qualquer disposição sobre conflito de leis, ficando eleito o Foro da Comarca de São Paulo, SP, com expressa renuncia de qualquer outro, por mais privilegiado que seja, para dirimir qualquer duvida, pendência ou litígio oriundo do mesmo.</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
