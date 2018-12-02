const path = require('path');
const babel = require('babel-core')

module.exports = {
  process(src, filename) {
    const name = path.parse(filename).name;
    const code = babel.transform(
      `
        const React = require('react');
        function ${name}(props) {
          return React.createElement(
            'svg',
            Object.assign({}, props)
          );
        }
        module.exports = ${name};
      `
    ).code;
    return code;
  }
}