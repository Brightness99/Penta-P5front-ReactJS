// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'utils/helpers';
import cx from 'classnames';

export class LookJobs extends React.Component {
  props: Props;

  render() {
    const { screenSize } = this.props;
    return (
      <div className={cx(!isMobile(screenSize) && ('container'))}>
        <div className="org-look-jobs">
          <h3 className="title-look-jobs">Confira nossas vagas disponíveis!</h3>
          <Link to="https://jobs.kenoby.com/printi" target="_blank" className="btn-default btn-primary btn-sm">Ver vagas</Link>
          <p className="desc-look-jobs">Atualmente, temos 5 vagas disponíveis. Candidate-se e boa sorte! ;)</p>
        </div>
      </div>
    );
  }
}

export default LookJobs;
