const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
});

const Subscription = mongoose.model(
  "Subscription",
  subscriptionSchema,
  "SubscriptionsCollection"
);

module.exports = Subscription;
