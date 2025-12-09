// const fs = require("fs");
// const csv = require("csv-parser");

// const CSV_PATH = "./data/sales_data.csv";

// function searchCSV(keyword) {
//   return new Promise((resolve) => {
//     const results = [];
//     const searchValue = keyword.toLowerCase();

//     fs.createReadStream(CSV_PATH)
//       .pipe(csv())
//       .on("data", (row) => {
//         // match any column
//         if (
//           Object.values(row)
//             .join(" ")
//             .toLowerCase()
//             .includes(searchValue)
//         ) {
//           results.push(row);
//         }
//       })
//       .on("end", () => {
//         resolve(results);
//       });
//   });
// }

// module.exports = { searchCSV };

const fs = require("fs");
const csv = require("csv-parser");

const CSV_PATH = "./data/sales_data.csv";

function searchCSV(keyword) {
  return new Promise((resolve) => {
    const results = [];
    const searchValue = keyword.toLowerCase();

    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on("data", (row) => {
        // 1️⃣ Match any column
        if (
          Object.values(row)
            .join(" ")
            .toLowerCase()
            .includes(searchValue)
        ) {
          results.push(row);
        }

        // 2️⃣ Mobile match
        if (row.Mobile && String(row.Mobile).includes(keyword)) {
          results.push(row);
        }

        // 3️⃣ Customer ID match
        if (row.CustomerID && String(row.CustomerID).toLowerCase().includes(searchValue)) {
          results.push(row);
        }
      })
      .on("end", () => {
        resolve(results);
      });
  });
}

module.exports = { searchCSV };
