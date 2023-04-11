import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';

function BtnShare({ pathname }) {
  const tempoMsgDeCopiado = 3500;
  const [linkCopiado, setLinkCopiado] = useState(false);
  console.log(pathname);

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    }
  }

  const handleCopyClick = () => {
    const text = `http://localhost:3000${pathname}`;
    console.log(text);
    copyTextToClipboard(text)
      .then(() => {
        setLinkCopiado(true);
        setTimeout(() => {
          setLinkCopiado(false);
        }, tempoMsgDeCopiado);
      })
      .catch((e) => {
        console.log(e);
      });
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

export default BtnShare;
BtnShare.propTypes = { }.isRequired;
