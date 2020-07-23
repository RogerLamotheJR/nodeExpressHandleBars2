const querystring = require('querystring');

module.exports = function(req, res, next) {
  let data = '';
  req.on('data', chunk => (data += chunk));
  req.on('end', () => {
    req.json = querystring.parse(data);
    next();
  });
};
