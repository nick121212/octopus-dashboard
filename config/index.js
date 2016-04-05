import development from './development';
import production from './production';

let env = process.env.environment || 'development';
let settings = env === 'development' ? development : production;

module.exports = settings;