// @flow
import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
  const style = {
    width: `${progress}%`,
  };

  return (
    <section className="progress-container">
      <section className="progress-bar" role="progressbar" style={style}>
        <span className="sr-only">{progress}% Complete</span>
      </section>
    </section>
  );
};

export default ProgressBar;
