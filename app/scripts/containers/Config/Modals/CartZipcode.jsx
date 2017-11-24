// @flow

import React from 'react';

type Props = {
  onReset: () => {},
  onClear: () => {},
  zipcode: string,
};

const CartZipcodeModal = (props: Props) => {
  const handleReset = () => {
    const { onReset } = props;

    if (typeof onReset === 'function') {
      onReset();
    }
  };

  const handleClear = () => {
    const { onClear } = props;

    if (typeof onClear === 'function') {
      onClear();
    }
  };

  return (
    <div>
      <span>Atenção!</span>
      <span>A entrega de todos os produtos do carrinho será alterada para este novo CEP:</span>
      <span>01513-020</span>
      <button onClick={handleReset}>Trocar o CEP</button>
      <button onClick={handleClear}>Limpar o Carrinho</button>
    </div>
  );
};

export default CartZipcodeModal;
