const express = require('express');
const User = require('../models/User');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });

app.get(
    "/protected",
    jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
    function (req, res) {
      if (!req.auth.admin) return res.sendStatus(401);
      res.sendStatus(200);
    }
  );
// Protected Route

module.exports = checkJwt;
