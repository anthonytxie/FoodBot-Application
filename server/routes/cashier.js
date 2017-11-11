//MODULES
const express = require("express");
const routes = express();
const moment = require("moment");
const { findDifferentItemsOnBurger } = require("./../../config/menuItems");
const { logger } = require("./../logger/logger");

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/cashier", (req, res) => {
  logger.info("GET on /cashier");
  orderDAO
    .showIncompleteOrders()
    .then(orders => {
      res.status(200).render("cashier.pug", {
        orders,
        findDifferentItemsOnBurger
      });
    })
    .catch(err => {
      logger.error(`GET on /cashier`, { err });
      res.status(500).send({ success: false });
    });
});

routes.post("/input", (req, res) => {
  logger.info("POST on /input");
  let { orderId } = req.body;
  orderDAO
    .updateInputtedOrder(orderId)
    .then(() => {
      return orderDAO.showIncompleteOrders();
    })
    .then(orders => {
      res.render("cashier.pug", { orders });
    })
    .catch(err => {
      logger.error(`POST on /input`, { err });
      res.status(500).send({ success: false });
    });
});

routes.post("/cashier", (req, res) => {
  logger.info("POST on /cashier");
  const isInputted = parseInt(req.body.isInputted);
  if (isInputted) {
    orderDAO
      .updateInputtedOrder(req.body.id, true)
      .then(() => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        logger.error(`POST on /cashier`, { err });
        res.status(500).send({ success: false });
      });
  } else {
    orderDAO
      .updateInputtedOrder(req.body.id, false)
      .then(() => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        logger.error(`POST on /cashier`, { err });
        res.status(500).send({ success: false });
      });
  }
});

module.exports = routes;
