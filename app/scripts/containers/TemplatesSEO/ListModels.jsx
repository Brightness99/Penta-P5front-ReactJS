// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { GlassZoomIcon } from 'components/Icons';
import { Select } from 'atoms/Inputs';

type Props = {
  screenSize: string;
}

class ListModels extends React.PureComponent<Props> {
  static props: Props;

  renderButtons() {
    return (
      <nav className="qrk-btns-model">
        <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">{'Personalizar modelo'}</Link>
        <Link to="#" className="btn-default btn-sm fnt-sbolf btn-details"><GlassZoomIcon />{'Ver Detalhes'}</Link>
      </nav>
    );
  }
  renderMobile() {
    return (
      <section>
        <section className="mol-list-models">
          <figure className="atm-model">
            <img src={require('assets/media/svg-wannabe/drop-file.png')} alt="Drop" />
            <figcaption className="qrk-fnt-send-art">{'Enviar minha arte final'}</figcaption>
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
        </section>
      </section>
    );
  }
  renderDesktop() {
    return (
      <section>
        <section className="mol-search-models-page">
          <form
            className="atm-search-page"
            onSubmit={this.handleSubmit}
          >
            <input
              className="qrk-input"
              type="text"
              name="q"
              placeholder="Procure por produtos ou informações..."
              onChange={this.handleChange}
            />
            <Select
              className="qrk-select"
              name=""
              showLabel={true}
              id=""
              placeholder="Modelos por página"
            >
              <option value="">{'Mostrar 12 modelos por página'}</option>
              <option value="">{'Mostrar N modelos por página'}</option>
            </Select>
          </form>
        </section>
        <section className="mol-list-models">
          <figure className="atm-model">
            <img src={require('assets/media/svg-wannabe/drop-file.png')} alt="Drop" />
            <figcaption className="qrk-fnt-send-art">{'Enviar minha arte final'}</figcaption>
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
          <figure className="atm-model">
            <img src={require('assets/media/images/img-modelstemplate.jpg')} alt="Modelo" />
            {this.renderButtons()}
          </figure>
        </section>
      </section>
    );
  }
  render() {
    const { screenSize } = this.props;
    return (
      <div className="org-list-models">
        {
          ['xs', 'is', 'sm', 'ix', 'md', 'im'].includes(screenSize)
            ? this.renderMobile()
            : this.renderDesktop()
        }
      </div>
    );
  }
}

export default ListModels;
