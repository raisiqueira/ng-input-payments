const scopes = ['project', 'payment-inputs', 'demo'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scopes],
    'header-max-length': [2, 'always', 100],
  },
};
