const Query = require('./../models/queryModel');

const queryController = {};

// queryController.getAllUsers = (next) => {
//   Query.find({}, next);
// };

// queryController.createUser = (req, res, next) => {
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

module.exports = queryController;
