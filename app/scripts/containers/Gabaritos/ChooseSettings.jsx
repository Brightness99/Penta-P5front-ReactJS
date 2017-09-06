// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'atoms/Inputs/Select';

import { Arrow } from 'components/Icons';

export class ChooseSettings extends React.Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="container-chooseSettings">
            <div className="item-chooseSettings">
              <div className="box-numberSetting">
                <span>1</span>
              </div>
              <p className="title-chooseSettings">Orientação</p>
              <form className="org-checkout-content-data">
                <Select
                  className="atm-checkout-input atm-checkout-input-one"
                  name="orientation"
                  showLabel={true}
                  id="orientation"
                  placeholder="Selecione..."
                  required={true}
                >
                  <option value={'paisagem'}>Paisagem</option>
                  <option value={'retrato'}>Retrato</option>
                </Select>
              </form>
            </div>
            <div className="item-chooseSettings">
              <div className="box-numberSetting">
                <span>2</span>
              </div>
              <p className="title-chooseSettings">Número de páginas</p>
              <form className="org-checkout-content-data">
                <Select
                  className="atm-checkout-input atm-checkout-input-one"
                  name="orientation"
                  showLabel={true}
                  id="orientation"
                  placeholder="Selecione..."
                  required={true}
                >
                  <option value={'paisagem'}>Paisagem</option>
                  <option value={'retrato'}>Retrato</option>
                </Select>
              </form>
            </div>
            <div className="item-chooseSettings">
              <div className="box-numberSetting">
                <span>3</span>
              </div>
              <p className="title-chooseSettings">Formato</p>
              <form className="org-checkout-content-data">
                <Select
                  className="atm-checkout-input atm-checkout-input-one"
                  name="orientation"
                  showLabel={true}
                  id="orientation"
                  placeholder="Selecione..."
                  required={true}
                >
                  <option value={'paisagem'}>Paisagem</option>
                  <option value={'retrato'}>Retrato</option>
                </Select>
              </form>
            </div>
          </div>
          <div className="org-links-chooseSettings">
            <Link to="#" className="atm-link"><Arrow />Voltar para escolher outro produto</Link>
            <Link to="#" className="btn-default btn-primary btn-sm fnt-sbold">Continuar</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default ChooseSettings;
