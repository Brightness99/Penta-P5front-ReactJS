// @flow
import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import { PageTitle } from 'atoms/Titles';
import Alert from 'components/Alert/warningFull';

type Props = {
  app: AppStore,
  router: RouterStore,
  locale: {},
  match: {},
  dispatch: () => {},
};

export class Upload extends React.Component {

  static props: Props;

  render() {

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Marca página',
        url: '/configuracao-marca-pagina',
      },
      {
        title: 'Enviar arte',
        url: '',
      },
    ];

    const alert = [
      {
        title: 'Atenção!',
        message: 'A arte deve ser enviada até 22/08/17 às 20:00 . Após esse período a previsão de entrega será alterada.'
      },
      {
        title: 'Atenção!',
        message: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após esse período a previsão de entrega será alterada.'
      }
    ];

    return (
      <div>
        <div className="page-upload">
          <div className="container">
            <Breadcrumbs links={breadcrumb} />
            <PageTitle>envie sua arte final</PageTitle>
            <div className="alert-container">
              <Alert alert={alert} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    app: state.app,
    router: state.router,
    locale: state.locale,
  });
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Upload);

