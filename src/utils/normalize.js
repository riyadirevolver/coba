/* eslint-disable no-prototype-builtins */
var jsonStr = `{
    "city": {
        "data": {
            "id": 649442,
            "country_id": 54,
            "state_id": 682,
            "city_name": "Prague",
            "state_name": "Praha"
        }
    },
    "country": {
        "data": {
            "id": 54,
            "data": {
                "country_name": "Czech Republic",
                "short_country": "CZ",
                "olympic_code": "CZE"
            }
        }
    }
}`;

const jo = JSON.parse(jsonStr);

export const normalizeJSONParse = () => {
  return normalize(jo);
};

function normalize(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        if (key === 'data') {
          // check if data object also has a data property
          if (obj[key].hasOwnProperty('data')) {
            // double recursion
            normalize(obj[key]);
            normalize(obj);
          } else {
            // copy all values to the parent
            // (only if they don't exist in the parent yet)
            for (var subKey in obj[key]) {
              if (
                obj[key].hasOwnProperty(subKey) &&
                !obj.hasOwnProperty(subKey)
              ) {
                obj[subKey] = obj[key][subKey];
              }
            }
            // remove the data key
            delete obj[key];
          }
        } else {
          // recursion
          normalize(obj[key]);
        }
      }
    }
  }
}
