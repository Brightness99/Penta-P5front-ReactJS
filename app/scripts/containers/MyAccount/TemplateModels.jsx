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
      <section className="container-templateModels">
        <div className="container">
          <h2>Minha conta</h2>
          <h3 className="subtitle-templateModels">Modelos Salvos</h3>

          <div className="box-templateModels">
            <div className="org-input-research">
              <input type="text" className="mol-input-text" placeholder="Procurar modelos" />
              <select className="mol-select-research">
                <option value="all">Todos os modelos</option>
                <option value="opt1">Opção 1</option>
                <option value="opt2">Opção 2</option>
                <option value="opt3">Opção 3</option>
              </select>
              <select className="mol-select-research">
                <option value="showall">Mostrar todos os modelos</option>
                <option value="opt1">Opção 1</option>
                <option value="opt2">Opção 2</option>
                <option value="opt3">Opção 3</option>
              </select>
            </div>

            <div className="box-itensModel">

              <div className="itemModel">
                <h4 className="title-item">Cartão de visita - Jenny</h4>

                <div className="img-itemModel">
                  <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
                </div>

                <div className="btn-itemModel">
                  <div className="btn-item fnt-edit-delete btn-item--mobile">
                    <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                    <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                  </div>
                </div>
              </div>

              <div className="itemModel">
                <h4 className="title-item">Cartão de visita - Jenny</h4>

                <div className="img-itemModel">
                  <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
                </div>

                <div className="btn-itemModel">
                  <div className="btn-item fnt-edit-delete btn-item--mobile">
                    <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                    <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                  </div>
                </div>
              </div>

              <div className="itemModel">
                <h4 className="title-item">Cartão de visita - Jenny</h4>

                <div className="img-itemModel">
                  <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
                </div>

                <div className="btn-itemModel">
                  <div className="btn-item fnt-edit-delete btn-item--mobile">
                    <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                    <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                  </div>
                </div>
              </div>

              <div className="itemModel">
                <h4 className="title-item">Cartão de visita - Jenny</h4>

                <div className="img-itemModel">
                  <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="tela" />
                </div>

                <div className="btn-itemModel">
                  <div className="btn-item fnt-edit-delete btn-item--mobile">
                    <Link to="#" className="icon-edit"><i><PencilIcon /></i>Editar</Link>
                    <Link to="#" className="icon-delete"><i><TrashIcon /></i>Excluir</Link>
                  </div>
                </div>
              </div>

              <div className="btn-item">
                <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Comprar</Link>
              </div>

            </div>
          </div>
        </div>
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
    const styleArrow = {
      backgroundImage: `url('${require('../../../../assets/media/svg/icon_arrowdown.svg')}')`,
      backgroundSize: '16px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '95%',
    };

    return (
      <section className="container-templateModels">
        <Breadcrumbs links={breadcrumb} />
        <h2>Minha conta</h2>
        <h3 className="subtitle-templateModels">Modelos Salvos</h3>

        <div className="box-templateModels">
          <div className="org-input-research">
            <input type="text" className="mol-input-text" placeholder="Procurar modelos" />
            <select className="mol-select-research" style={styleArrow}>
              <option value="all">Todos os modelos</option>
              <option value="opt1">Opção 1</option>
              <option value="opt2">Opção 2</option>
              <option value="opt3">Opção 3</option>
            </select>
            <select className="mol-select-research" style={styleArrow}>
              <option value="showall">Mostrar todos os modelos</option>
              <option value="opt1">Opção 1</option>
              <option value="opt2">Opção 2</option>
              <option value="opt3">Opção 3</option>
            </select>
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
