import React from 'react';
import { Link } from 'react-router-dom';

export class LookJobs extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="org-look-jobs">
          <h3 className="title-look-jobs">Confira nossas vagas disponíveis!</h3>
          <Link to="#" className="btn-default btn-primary btn-sm">Ver vagas</Link>
          <p className="desc-look-jobs">Atualmente, temos 5 vagas disponíveis. Candidate-se e boa sorte! ;)</p>
        </div>
      </div>
    );
  }
}

export default LookJobs;
