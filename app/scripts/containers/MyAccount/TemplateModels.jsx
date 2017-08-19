// @flow
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { Link } from 'react-router-dom';
import { CodeBar, CheckIcon, Receipt, ExclamationMark, CloseIcon, Warning, Change, Archive, CalendarIcon, ArrowCarousel, PencilIcon, TrashIcon } from 'components/Icons';

type Props = {
  screenSize: string,
};

export class TemplateModels extends React.Component {
  static defaultProps = {
    screenSize: 'xs',
  };

  static props: Props;

  renderMobile() {
    return (
      <section className="container-myaccountdetails">
        <h2>Minha conta</h2>
      </section>
    );
  }

  renderDesktop() {
    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Minha conta',
        url: '/minha-conta',
      },
      {
        title: 'Modelos Salvos',
      },
    ];
    return (
      <section className="container-templateModels">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-templateModels">Modelos Salvos</h3>

        <div className="box-templateModels">
          <div>
            <p>inputs</p>
          </div>

          <div className="box-itensModel">

            <div className="itemModel">
              <h4 className="title-item">Cartão de visita - Jenny</h4>

              <div className="img-itemModel">
                <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
              </div>

              <div className="btn-itemModel">
                <div className="btn-item fnt-edit-delete">
                  <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                  <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                </div>
                <div className="btn-item">
                  <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Comprar</Link>
                </div>
              </div>
            </div>

            <div className="itemModel">
              <h4 className="title-item">Cartão de visita - Jenny</h4>

              <div className="img-itemModel">
                <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
              </div>

              <div className="btn-itemModel">
                <div className="btn-item fnt-edit-delete">
                  <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                  <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                </div>
                <div className="btn-item">
                  <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Comprar</Link>
                </div>
              </div>
            </div>

            <div className="itemModel">
              <h4 className="title-item">Cartão de visita - Jenny</h4>

              <div className="img-itemModel">
                <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
              </div>

              <div className="btn-itemModel">
                <div className="btn-item fnt-edit-delete">
                  <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                  <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                </div>
                <div className="btn-item">
                  <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Comprar</Link>
                </div>
              </div>
            </div>

            <div className="itemModel">
              <h4 className="title-item">Cartão de visita - Jenny</h4>

              <div className="img-itemModel">
                <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
              </div>

              <div className="btn-itemModel">
                <div className="btn-item fnt-edit-delete">
                  <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                  <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                </div>
                <div className="btn-item">
                  <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Comprar</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  render() {
    const { screenSize } = this.props;

    return ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
      ? this.renderMobile()
      : this.renderDesktop();
  }
}

export default TemplateModels;
