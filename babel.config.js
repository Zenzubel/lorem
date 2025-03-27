module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.8.0',
          shippedProposals: true,
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-optional-chaining'],
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
      ['@babel/plugin-proposal-class-properties'],
    ],
  };
};
