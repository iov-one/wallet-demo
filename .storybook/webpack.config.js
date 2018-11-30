
process.env.NODE_ENV = 'development'
const devConfig = require('../webpack/development.config.js');

module.exports = function(storybookConfig, configType) {
    console.log(devConfig)
    const config = Object.assign({}, devConfig);

    storybookConfig.module.rules = storybookConfig.module.rules.concat(config.module.rules)
    storybookConfig.resolve = config.resolve;

    return storybookConfig;
};
