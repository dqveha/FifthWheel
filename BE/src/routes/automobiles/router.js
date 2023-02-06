const express = require("express");
const automobilesRouter = express.Router();
const { automobiles } = require("../../../data/automobiles");
const { authentication } = require("../../middleware/auth");
const {
  searchByPrice,
  searchDealershipLotByDetails,
  updateAutomobile,
} = require("../../controller/automobiles");

automobilesRouter.post("/search", authentication(), (req, res, next) => {
  const dealershipId = res.locals.user.dealershipId;
  const { priceType, lowestPricePoint, highestPricePoint } = req.body.data;
  const searchedValues = Object.values(req.body.data?.details);

  let results;
  results = searchDealershipLotByDetails(dealershipId, searchedValues);

  if ((lowestPricePoint || highestPricePoint) && priceType) {
    results = searchByPrice(
      results,
      lowestPricePoint,
      highestPricePoint,
      priceType
    );
  }

  res.status(200).send(results);
});

automobilesRouter.put(
  "/automobile",
  authentication(),
  async (req, res, next) => {
    try {
      const { id } = req.body.data.details;
      const dealershipId = res.locals.user.dealershipId;
      const updatedValues = Object.entries(req.body.data.details);

      const results = updateAutomobile(
        automobiles,
        dealershipId,
        id,
        updatedValues
      );
      res.status(200).json(results);
    } catch (err) {
      res.status(401).json("Access Denied");
    }
  }
);

module.exports = {
  automobilesRouter,
};
