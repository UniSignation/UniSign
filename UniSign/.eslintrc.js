module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  }
};
