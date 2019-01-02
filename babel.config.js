module.exports = api => {
  api.cache(false)
  return {
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['styled-components', { displayName: true }],
    ],
    presets: ['@babel/preset-env', '@babel/preset-react'],
  }
}
