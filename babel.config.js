module.exports = function(api) {
  api.assertVersion('^7.0')

  let config = {}

  if (api.env('test')) {
    config = {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ]
    }
  } else {
    config = {
      presets: ['@vue/babel-preset-app']
    }
  }

  return config
}
