const { Link } = require("./../models/index");
const mongoose = require("mongoose");
const linkDAO = {};
const { logger } = require("./../../server/logger/logger");

linkDAO.createNewLink = function() {
  logger.info(`linkDAO createNewLink`);
  return new Promise((resolve, reject) => {
    const link = new Link();
    link
      .save()
      .then(link => {
        resolve(link);
      })
      .catch(err => {
        logger.error(`linkDAO createNewLink`, { err });
        reject(err);
      });
  });
};

module.exports = linkDAO;
