import mongoose from 'mongoose';

const MONGO_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds229771.mlab.com:29771/researcher`;

mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
});

mongoose.connection.once('open', (err) => {
  if (err) console.log(err);
});
