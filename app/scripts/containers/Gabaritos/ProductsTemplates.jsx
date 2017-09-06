// @flow
import React from 'react';

type Props = {
  screenSize: string;
}

export class ProductsTemplates extends React.Component {

  render() {
    return (
      <section>
        <div className="container">
          <ul className="container-productsTemplates">
            <li><p>Cartão de visita</p></li>
            <li><p>Cartão de visita (verniz local)</p></li>
            <li><p>Cartaz/Pôster</p></li>
            <li>
              <p>Papel timbrado/ receituário</p>
              <p>Bloco de notas</p>
            </li>
            <li><p>Pasta</p></li>
            <li><p>Tag</p></li>
            <li><p>Tag (Verniz local)</p></li>
            <li><p>Banner</p></li>
            <li><p>Banner L</p></li>
            <li><p>Banner Rollup</p></li>
            <li><p>Cartão Postal</p></li>
            <li><p>Cartão Postal (Verniz Local)</p></li>
          </ul>
        </div>
      </section>
    );
  }
}

export default ProductsTemplates;
