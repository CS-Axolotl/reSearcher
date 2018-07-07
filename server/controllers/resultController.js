const Result = require('./../models/resultModel');

const ResultController = {};

// ResultController.getAll = (next) => {
//   Result.find({}, next);
// };

// ResultController.create = (req, res, next) => {
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

module.exports = ResultController;
