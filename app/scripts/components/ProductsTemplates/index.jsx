// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  screenSize: string;
  templates: Array<TemplateType>,
  handleNavigation: (step: number) => void,
  setActiveFinalId: (id: string) => void,
}

const currentStep = 1;

export class ProductsTemplates extends React.PureComponent<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.handleNavigation(currentStep);
  }

  static props: Props;

  handleChoosingTemplate = (id: number) => {
    this.props.setActiveFinalId(id);
    this.props.handleNavigation(currentStep + 1);
  };

  render() {
    const { templates } = this.props;
    return (
      <section>
        <section className="container">
          <ul className="org-products-templates">
            {templates.filter(t => Boolean(t.final_product_id) && Boolean(t.final_product_name))
            .map(template =>
              <NavLink
                key={template.final_product_id}
                className="org-product-template"
                to={`/download-de-gabaritos/${template.final_product_id.slice(1)}`}
                onClick={() => this.handleChoosingTemplate(template.final_product_id.slice(1))}
              >
                <li>
                  <p>{template.final_product_name}</p>
                </li>
              </NavLink>
            )}
          </ul>
        </section>
      </section>
    );
  }
}

export default ProductsTemplates;
