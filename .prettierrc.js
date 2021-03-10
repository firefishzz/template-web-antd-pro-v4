const fabric = require('@umijs/fabric')

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  trailingComma: 'none',
  semi: false
}
