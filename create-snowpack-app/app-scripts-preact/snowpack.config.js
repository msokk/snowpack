const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const isTS = fs.existsSync(path.join(cwd, 'tsconfig.json'));

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: ['@snowpack/plugin-babel', '@prefresh/snowpack', '@snowpack/plugin-dotenv'],
  installOptions: {
    installTypes: isTS,
  },
};
