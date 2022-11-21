const mongoose = require('mongoose');


// mongoose schema
const walletSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: String
    },
    balance: {
        type: String
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", walletSchema);
module.exports = Wallet;