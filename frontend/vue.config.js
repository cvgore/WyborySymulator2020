module.exports = {
  configureWebpack: {
    devServer: {
      disableHostCheck: true,
      before(app, server, compiler) {
        app.use(function(req, res, next) {
          res.header('Access-Control-Allow-Origin', '*');

          next();
        });
      },
    },
  },
};
