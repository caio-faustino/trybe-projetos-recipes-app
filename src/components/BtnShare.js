import React, { useState } from 'react';

import shareIcon from '../images/shareIcon.svg';

function BtnShareWrapped({ pathname }) {
  const tempoMsgDeCopiado = 3500;
  const [linkCopiado, setLinkCopiado] = useState(false);

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    }
  }

  const handleCopyClick = async () => {
    const text = `http://localhost:3000${pathname}`;
    await copyTextToClipboard(text);
    setLinkCopiado(true);
    setTimeout(() => {
      setLinkCopiado(false);
    }, tempoMsgDeCopiado);
  };
  return (
    <div>
      <button
        data-testid="share-btn"
        className="icone-link"
        onClick={ handleCopyClick }
      >
        <img src={ shareIcon } alt="share" />
        <span>{linkCopiado ? 'Link copied!' : ''}</span>
      </button>
    </div>
  );
}

BtnShareWrapped.propTypes = { }.isRequired;
export const BtnShare = React.memo(BtnShareWrapped);
