import React, { useState } from 'react';

import shareIcon from '../images/shareIcon.svg';

function BtnShare({ pathname }) {
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
    <button
      data-testid="share-btn"
      type="button"
      className="botaoBranco"
      onClick={ handleCopyClick }
    >
      <img
        src={ shareIcon }
        alt="share"
        className="-ml-1 mr-1.5 h-5 w-5 fill-white"
      />
      Share
      <span>{linkCopiado ? 'Link copied!' : ''}</span>
    </button>
  );
}

BtnShare.propTypes = {}.isRequired;
BtnShare.propTypes = { }.isRequired;
export default React.memo(BtnShare);
