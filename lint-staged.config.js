module.exports = {
  '*.js': ['yarn lint:eslint', 'yarn lint:prettier', 'git add'],
  '{!(package)*.json,*.!(browserslist)*rc}': [
    'yarn lint:prettier --parser json',
    'git add',
  ],
  'package.json': ['yarn lint:prettier', 'git add'],
  '*.scss': ['yarn lint:stylelint', 'yarn lint:prettier', 'git add'],
};
