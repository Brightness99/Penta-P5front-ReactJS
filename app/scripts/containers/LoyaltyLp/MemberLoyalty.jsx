// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import { ChevronDownIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};
export class MemberLoyalty extends React.Component {
  static props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className="container">
        <div className="atm-member-loyalty">
          <h3 className="title-loyalty">Como se tornar membro</h3>
          <p className="subtitle-loyalty">Muito fácil, como tudo por aqui:</p>

          <div className="qrk-be-member">
            <div className="img-desc-be-member">
              <div className="img-be-member">
                <img src={require('assets/media/images/member-loyalty1.png')} alt="Membro" />
              </div>
              {!isMobile(screenSize) ?
                (<div className="text-be-member">
                  <p className="first-text-be-member">Pronto, você já é um membro! \o/</p>
                  <p className="second-text-be-member">Aí é só aproveitar todas as promoções exclusivas que reservamos para nossos clientes de carteirinha.</p>
                </div>) :
                (<div className="text-be-member">
                  <p className="first-text-be-member">R$500 em compras</p>
                  <p className="second-text-be-member">Pode ser em quantas compras quiser, o importante é que seja dentro do intervalo de um ano.</p>
                </div>)
              }
            </div>

            <div className="line-dashed">
              <div className="icon-into-line">
                <span>Club</span>
              </div>

              <div className="icon-into-line">
                <span>Club</span>
              </div>

              <div className="icon-into-line">
                <img src={require('assets/media/images/icon-club.png')} alt="Club" />
              </div>
            </div>

            <div className="img-desc-be-member">
              {isMobile(screenSize) ?
                (<div className="text-be-member">
                  <p className="first-text-be-member">Pronto, você já é um membro! \o/</p>
                  <p className="second-text-be-member">Aí é só aproveitar todas as promoções exclusivas que reservamos para nossos clientes de carteirinha.</p>
                </div>) :
                (<div className="text-be-member">
                  <p className="first-text-be-member">R$500 em compras</p>
                  <p className="second-text-be-member">Pode ser em quantas compras quiser, o importante é que seja dentro do intervalo de um ano.</p>
                </div>)
              }
              <div className="img-be-member">
                <img src={require('assets/media/images/member-loyalty2.png')} alt="Membro" />
              </div>
            </div>
          </div>

          <div className="qrk-link-scroll-be-member">
            <h3 className="first-text-scroll-be-member">Como se tornar membro premium?</h3>
            <p className="second-text-scroll-be-member">Entenda as regras e acomule benefícios</p>
            {!isMobile(screenSize) ?
              <Link to="#" className="icon-arrow"><ChevronDownIcon /></Link> : null
            }
          </div>
          {isMobile(screenSize) ?
            <Link to="#" className="icon-arrow"><ChevronDownIcon /></Link> : null
          }

        </div>
      </div>
    );
  }
}

export default MemberLoyalty;
