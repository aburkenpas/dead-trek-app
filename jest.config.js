const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '^[@~]/(.*)$': '<rootDir>/src/$1'
  },
  preset: defaults.preset,
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  }
}
