
module.exports = function (api) {
  const esm = api.env(['esm']);

  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        modules: esm ? false : 'commonjs',
        exclude: [
          'proposal-class-properties',
          'proposal-object-rest-spread'
        ]
      },
    ],
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/plugin-transform-runtime'
  ];

  return {
    presets,
    plugins,
  };
};
