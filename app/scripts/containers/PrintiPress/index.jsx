// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'utils/helpers';
import Breadcrumbs from 'components/Breadcrumbs';
import { PrintiPressItem } from 'components/PrintiPressItem';
import { printiPressFetch } from 'actions';
import { Link } from 'react-router-dom';

type Props = {
  screenSize: string,
  pressFetch: () => void,
  pressList: []
};

export class PrintiPress extends React.Component {

  componentDidMount = () => {
    const { pressFetch } = this.props;

    if (typeof pressFetch !== 'function') {
      return;
    }

    pressFetch();
  };

  static props: Props;

  render() {
    const { screenSize, pressList } = this.props;

    const breadcrumb = [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Printi na imprensa',
      },
    ];

    return (
      <section>
        <div className="tpl-printi-press">
          <div className="container">
            {!isMobile(screenSize) && <Breadcrumbs links={breadcrumb} />}
            <h2 className="title-printi-press">Printi na imprensa</h2>

            <div className="org-printi-press">
              {
                pressList.map((x) =>
                    <PrintiPressItem item={x} key={x.id} />
                 )
              }
            </div>
            <div className="org-container-btn">
              <Link to="#" className="btn-default btn-third btn-xs">Carregar mais notícias (4)</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  screenSize: state.app.screenSize,
  pressList: state.printiPress.press,
});

const mapDispatchToProps = (dispatch) => ({
  pressFetch: () => dispatch(printiPressFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintiPress);
