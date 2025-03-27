// require all svg
function importAll(r) {
  r.keys().forEach(r);
}

export default importAll(require.context('../../svg', false, /\.svg$/));
