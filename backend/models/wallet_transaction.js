const mongoose = require('mongoose');


// mongoose schema
const walletTransactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, default: 0 },

    userId: {
      type: String,
      ref: "users",
      required: true,
    },

    isInflow: { type: Boolean },

    paymentMethod: { type: String, default: "seerbit" },

    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },

    status: {
      type: String,
      required: [true, "payment status is required"],
      enum: ["successful", "pending", "failed"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("walletTransaction", walletTransactionSchema);



const wallet_transaction = mongoose.model('walletTransaction', walletTransactionSchema);
module.exports = wallet_transaction;