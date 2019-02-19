var express = require('express');
var format = require('string-template');

module.exports = function (app) {

  return new express.Router()
  .get('/hello', helloApi);

  function helloApi(req, res, next) {
    req.log.info('Inside helloApi route');
    res.send({message: 'Hello, Thanks for reaching out!'});
  }
};
