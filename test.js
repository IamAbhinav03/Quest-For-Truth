// Fetch questions from CSV file
// fetch("questions.csv")
//   .then((response) => response.text())
//   .then((data) => {
//     questions = parseCSV(data);
//     displayQuestion();
//   });

// // Parse CSV data into an array of objects
// function parseCSV(csvData) {
//   const lines = csvData.split("\n");
//   const headers = lines[0].split(",");
//   const questionObjects = [];

//   for (let i = 1; i < lines.length; i++) {
//     const values = lines[i].split(",");
//     const questionObject = {};
//     for (let j = 0; j < headers.length; j++) {
//       questionObject[headers[j].trim()] = values[j].trim();
//     }
//     questionObjects.push(questionObject);
//   }

//   return questionObjects;
// }
function parseCSV() {
  Papa.parse("/data.csv", {
    header: true, // Treat the first row as headers
    complete: function (results) {
      console.log("Parsed CSV:", results.data);
      // Convert parsed data to JSON
      var jsonData = JSON.stringify(results.data);
      console.log("JSON Data:", jsonData);
      // You can further process or display the JSON data here
    },
  });
}

parseCSV();
