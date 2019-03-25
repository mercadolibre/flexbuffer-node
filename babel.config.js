module.exports = {
  ignore: [
    '**/__mocks',
    '**/__tests__'
  ],
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 6
        }
      }
    ],
    '@babel/preset-typescript'
  ]
};
