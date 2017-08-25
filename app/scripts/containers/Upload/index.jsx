// @flow
import React from 'react';
import { connect } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import { PageTitle } from 'atoms/Titles';
import Alert from 'components/Alert';

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

    const alerts = [
      {
        type: 'error',
        title: 'Desculpe!',
        content: 'Ocorreu um erro interno impossibilitando seu upload.'
      },
      {
        type: 'warning',
        title: 'Atenção!',
        content: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após esse período a previsão de entrega será alterada.'
      },
      {
        type: 'warning',
        title: 'Atenção!',
        content: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após dsadsse período a previsão de entrega será alterada.'
      },
      {
        type: 'error',
        title: 'Atenção!',
        content: 'A arte deve ser enviada até 23/08/17 às 20:00 . Após esse perfgdgfíodo a previsão de entrega será alterada.'
      }
    ];

    const renderAlerts = () => {
      return alerts.map((alert) => (<Alert key={`${new Date()}-${alert.content}`} type={alert.type} title={alert.title} content={alert.content} />));
    };

    return (
      <div>
        <div className="page-upload">
          <div className="container">
            <Breadcrumbs links={breadcrumb} />
            <PageTitle>envie sua arte final</PageTitle>
            <div className="alert-container">{renderAlerts()}</div>
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

