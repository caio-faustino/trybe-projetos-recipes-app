export function mockarFetch(json) {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(json),
  });
}

export function restaurarFetch() {
  global.fetch.mockRestore();
}

export function mockarCategorias() {
  mockarFetch([]);
}
