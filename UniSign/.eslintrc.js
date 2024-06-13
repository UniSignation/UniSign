module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'warn',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^@/']
      }
    ]
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './']],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
