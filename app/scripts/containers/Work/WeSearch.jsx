import React from 'react';
import { CheckIcon } from 'components/Icons';

export class WeSearch extends React.Component {
  render() {
    return (
      <div className="org-we-search">
        <div className="container">
          <h3 className="title-we-search">As qualidades que buscamos</h3>
          <ul className="atm-skill-search">
            <li><CheckIcon /> Ousadia</li>
            <li><CheckIcon /> Criatividade</li>
            <li><CheckIcon /> Trabalho em equipe</li>
            <li><CheckIcon /> Pró-atividade</li>
            <li><CheckIcon /> Inovação</li>
            <li><CheckIcon /> Comprometimento</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default WeSearch;
