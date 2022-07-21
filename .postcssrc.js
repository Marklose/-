module.exports = {
  plugins: {
    'autoprefixer': {
      Browserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: (arg) => {
        return 37.5
      },
      propList: ['*']
    }
  }
}