// @flow

import React from 'react';
import { RoundedConfirmationButton } from 'atoms/Buttons';
import { CheckBox } from 'components/Input';

type Props = {
  isChecked: boolean,
  onConfirmation: () => {},
  onClose: () => {},
  onSubmit: () => {},
};

const ArtCreationModal = (props: Props) => {
  const { isChecked } = props;

  const handleConfirmation = () => {
    const { onConfirmation } = props;

    if (typeof onConfirmation === 'function') {
      onConfirmation();
    }
  };

  const handleCancel = () => {
    const { onCancel } = props;

    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  const handleSubmit = (ev) => {
    const { onSubmit } = props;

    if (typeof onSubmit === 'function') {
      onSubmit(ev);
    }
  };

  return (
    <div>
      <div className="app__sources-block__art-validation">
        <div>
          <h2>Regras da Criação de Arte</h2>
          <p>Olá!</p>
          <p>Vamos conhecer mais sobre o serviço de criação de arte?</p>
          <ul>
            <li>Um designer será o responsável pela criação da sua arte.</li>
            <li>O serviço prestado dá direito a uma montagem por pedido.</li>
            <li>Após o pagamento você irá preencher um briefing (formulário) no qual proverá as informações necessárias para a criação da arte.</li>
            <li>Serão permitidas apenas TRÊS alterações por pedido. A partir da 4ª alteração é gerado um custo adicional de R$ 10,00 (para cada nova alteração).</li>
            <li>O preenchimento do briefing tem prazo de 30 dias. Caso nossos profissionais não recebam interação neste período, o pedido será cancelado e um e-mail com orientações de como proceder com uma nova compra será encaminhado.</li>
          </ul>
          <p>Neste serviço <b>NÃO</b> estão inclusos:</p>
          <ul>
            <li>Criação, edição ou vetorização de logotipos.</li>
            <li>Criação e revisão de textos, o conteúdo é de sua responsabilidade.</li>
            <li>Nós não possuímos bancos de imagens, nem as retiramos de sites de busca, portanto estas são de sua responsabilidade.</li>
          </ul>
        </div>
      </div>
      <div className="app__sources-block__art-validation__footer">
        <div>
          <label>
            <CheckBox
              onChange={handleConfirmation}
              checked={isChecked}
            />
            Li e aceito as regras da criação de arte.
          </label>
        </div>
        <div>
          <button className="atm-button-text" onClick={handleCancel}>CANCELAR</button>
          <RoundedConfirmationButton
            isEnabled={isChecked}
            onClick={handleSubmit}
            value="art_creation"
          >
            OK
          </RoundedConfirmationButton>
        </div>
      </div>
    </div>
  );
};

export default ArtCreationModal;
