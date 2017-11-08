// @flow
import React from 'react';

type Props = {
  isLoading: boolean,
  children: React.Children
}

const OverlaySpinner = ({ isLoading, children }: Props) => (
  <section className="overlay-spinner-container">
    <section className="overlay-spinner-content">{children}</section>
    { isLoading &&
      <section className="overlay-spinner">
        <div className="loader" />
      </section>
    }
  </section>
);

export default OverlaySpinner;
