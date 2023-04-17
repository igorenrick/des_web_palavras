const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../public/adivinhacao-app',
  publicPath: '/adivinhacao-app/',
});
