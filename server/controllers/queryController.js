const Query = require('./../models/queryModel');

const QueryController = {};

// QueryController.getAll = (next) => {
//   Query.find({}, next);
// };

// QueryController.create = (req, res, next) => {
// const { id, date, results } = req.body;
//   Query.create(
//     { id, date, results },
//     (err, user) => {
//       if (err) {
//         res.status(400);
//       } else {
//         next();
//       }
//     },
//   );
// };

module.exports = QueryController;
