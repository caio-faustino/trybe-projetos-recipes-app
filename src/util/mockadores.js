export function mockarFetch(json) {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(json),
  });
}

export function mockarFetchComErro(erro) {
  jest.spyOn(global, 'fetch');
  global.fetch.mockRejectedValue(erro);
}

export function restaurarFetch() {
  global.fetch.mockRestore();
}

export function mockarCategorias() {
  mockarFetch([]);
}
