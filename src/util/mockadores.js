export function generateGuid() {
  const TRINTA_E_SEIS = 36;
  const DOIS = 2;
  const QUINZE = 15;
  // Com base emhttps://stackoverflow.com/questions/59412625/generate-random-uuid-javascript
  const resultado = Math.random().toString(TRINTA_E_SEIS).substring(DOIS, QUINZE)
      + Math.random().toString(TRINTA_E_SEIS).substring(DOIS, QUINZE);
  console.log('generateGuid', resultado);
  return resultado;
}

export function restaurarFetch() {
  jest.spyOn(global, 'fetch').mockRestore();
  // if (global.fetch.mockRestore) global.fetch.mockRestore();
}

export function mockarFetch(json) {
  restaurarFetch();
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(json),
  });
}

export const mockarFetchComErro = (erro) => {
  restaurarFetch();
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error(erro));
};

export function mockarCategorias() {
  mockarFetch([]);
}

export function mockarAlert() {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
}
