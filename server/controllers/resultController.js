const Result = require('./../models/resultModel');

const resultController = {};

// resultController.getAllResults = (next) => {
//   Result.find({}, next);
// };

// resultController.createResult = (req, res, next) => {
// const {id, url, title, description, pagePublishDate, tags} = req.body;
//   Result.create(
//     { id, url, title, description, pagePublishDate, tags},
//     (err, result) => {
//       if (err) {
//         res.status(400);
//       } else {
//         next();
//       }
//     },
//   );
// };

module.exports = resultController;
