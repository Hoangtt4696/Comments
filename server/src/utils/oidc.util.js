const { ExpressOIDC } = require('@okta/oidc-middleware');

module.exports = new ExpressOIDC({
  issuer: 'https://accounts.hara.vn',
  client_id: 'entrypoint.clientnode.dev',
  client_secret: 'secret',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile hac_api email org'
});
