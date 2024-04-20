/* Loads the entire dataset from the asset folder. */
const dataset = require("../assets/dataset.json");
/* We group the dataset on the basis of class */
const groupedDataset = dataset.reduce((result, obj) => {
  (result[obj["Alcohol"]] = result[obj["Alcohol"]] || []).push(obj);
  return result;
}, {});

/* This function calculates the mean, median, mode of Flavanoids */
const calculateFlavanoidsValues = function () {
  let groupMean = {},
    groupMedian = {},
    groupMode = {};
  Object.keys(groupedDataset).forEach((key) => {
    const mean = calculateMean(
      groupedDataset[key].map((item) => {
        if (typeof item.Flavanoids === "string") {
          item.Flavanoids = parseFloat(item.Flavanoids);
        }
        return item.Flavanoids;
      })
    ).toFixed(3);
    const median = calculateMedian(
      groupedDataset[key].map((item) => {
        if (typeof item.Flavanoids === "string") {
          item.Flavanoids = parseFloat(item.Flavanoids);
        }
        return item.Flavanoids;
      })
    ).toFixed(3);
    const mode = calculateMode(
      groupedDataset[key].map((item) => {
        if (typeof item.Flavanoids === "string") {
          item.Flavanoids = parseFloat(item.Flavanoids);
        }
        return item.Flavanoids;
      })
    )[0].toFixed(3);
    groupMean[key] = mean;
    groupMedian[key] = median;
    groupMode[key] = mode;
  });
  return { mean: groupMean, median: groupMedian, mode: groupMode };
};

/* This function calculates the mean, median, mode of Gamma */
const calculateGammaValues = function () {
  let groupMean = {},
    groupMedian = {},
    groupMode = {};
  Object.keys(groupedDataset).forEach((key) => {
    const mean = calculateMean(
      groupedDataset[key].map((item) =>
        calculateGamma(item.Ash, item.Hue, item.Magnesium)
      )
    ).toFixed(3);
    const median = calculateMedian(
      groupedDataset[key].map((item) =>
        calculateGamma(item.Ash, item.Hue, item.Magnesium)
      )
    ).toFixed(3);
    const mode = calculateMode(
      groupedDataset[key].map((item) =>
        calculateGamma(item.Ash, item.Hue, item.Magnesium)
      )
    )[0].toFixed(3);
    groupMean[key] = mean;
    groupMedian[key] = median;
    groupMode[key] = mode;
  });
  return { mean: groupMean, median: groupMedian, mode: groupMode };
};

/* This function calculates Gamma values using the formulae: Gamma = (Ash * Hue) / Magnesium.
    In case of invalid division it will return 0;
*/
const calculateGamma = function (ash, hue, magnesium) {
  if (typeof ash === "string") {
    ash = parseFloat(ash);
  }
  if (typeof magnesium === "string") {
    magnesium = parseFloat(magnesium);
  }
  if (typeof hue === "string") {
    hue = parseFloat(hue);
  }
  if (magnesium === 0.0) {
    return 0;
  }
  return ((ash * hue) / magnesium);
};

/* Calculate Mode of an array */
function calculateMode(arr) {
  let frequency = {};
  let maxFreq = 0;
  let modes = [];

  arr.forEach(function (num) {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      modes = [num];
    } else if (frequency[num] === maxFreq) {
      modes.push(num);
    }
  });

  return modes;
}

/* Calculate median of an array. */
function calculateMedian(arr) {
  console.log(arr);
  arr.sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}

/* Calculate mean of an array. */
function calculateMean(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

module.exports = { calculateFlavanoidsValues, calculateGammaValues };
