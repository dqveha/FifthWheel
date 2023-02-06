const { automobiles } = require('../../data/automobiles');
const fs = require('fs');

const searchDealershipLotByDetails = (dealershipId, searchTerms) => {
  const currentDealershipLot = automobiles.filter((automobile) => {
    return Number(automobile.dealershipId) === Number(dealershipId);
  });

  /**
   *  Creates copy of object with two entries, the first entry being the object
   *  and the second being each of the automobile's value without the key
   */
  const copyOfDealershipLot = currentDealershipLot.map(({ ...obj }) => [
    obj,
    Object.values(obj).flat(),
  ]);

  /**
   * Filters the values of copyOfDealershipLot, goes through each of the searchTerms element to compare the value.
   *
   * If true based on the "every" and "some" method, then it will be included. Numbers are ignored.
   *
   * Map is then called to return list of automobile objects with its entire details.
   */
  const foundAutomobiles = copyOfDealershipLot
    .filter(([, strings]) =>
      searchTerms.every((term) =>
        strings.some((string) => {
          if (typeof string === 'string')
            return string.toLowerCase().includes(term.toLowerCase());
        })
      )
    )
    .map(([obj]) => obj);

  return foundAutomobiles;
};

const searchByPrice = (
  dealershipLot,
  lowestPricePoint,
  highestPricePoint,
  priceType
) => {
  let currentSearch;
  if (lowestPricePoint) {
    currentSearch = dealershipLot.filter(
      (automobile) => automobile[priceType] > lowestPricePoint
    );
  }
  if (highestPricePoint) {
    currentSearch = currentSearch ? currentSearch : dealershipLot;
    currentSearch = currentSearch.filter(
      (automobile) => automobile[priceType] < highestPricePoint
    );
  }
  return currentSearch;
};

const getAutomobile = (dealershipId, id) => {
  const currentDealershipLot = automobiles.filter((automobile) => {
    return Number(automobile.dealershipId) === Number(dealershipId);
  });

  const foundAutomobile = currentDealershipLot.filter((automobile) => {
    return automobile.id === id;
  });

  if (foundAutomobile.length <= 0) {
    throw new Error();
  }

  return foundAutomobile;
};

const updateAutomobile = (
  automobilesDatabase,
  dealershipId,
  id,
  updateValues
) => {
  const automobile = getAutomobile(dealershipId, id);
  const copyOfAutomobile = Object.assign({}, ...automobile);
  const keyValuePairsAutomobile = Object.entries(copyOfAutomobile);
  let mappedAutomobile = new Map(keyValuePairsAutomobile);

  updateValues.forEach((pair) => {
    const key = pair[0];
    const value = pair[1];
    if (mappedAutomobile.has(key)) {
      mappedAutomobile.set(key, value);
    }
  });

  const updatedAutomobileObject = Object.fromEntries(mappedAutomobile);
  const filteredAutomobilesDb = automobilesDatabase.filter(
    (automobile) => automobile.id !== id
  );

  const updatedAutomobileWithDb = [
    updatedAutomobileObject,
    ...filteredAutomobilesDb,
  ];

  // To mimic database changes, the file is updated with fs
  const stringifiedDb = JSON.stringify(updatedAutomobileWithDb, null, 2);
  const updatedDb =
    'const automobiles = ' +
    stringifiedDb +
    '; ' +
    '\n\nmodule.exports.automobiles = automobiles';
  fs.writeFileSync('./data/automobiles.js', updatedDb);

  return updatedAutomobileObject;
};

module.exports = {
  searchByPrice,
  searchDealershipLotByDetails,
  updateAutomobile,
};
