module.exports = {
  extends: ['stylelint-config-recommended', 'stylelint-scss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'scss/at-rule-no-unknown': true,
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
};
