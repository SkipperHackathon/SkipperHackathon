const mongoose = require("mongoose");

const transactionSchema =new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    transactionId: {
      type: Number,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    currency: {
      type: String,
      required: [true, "currency is required"],
      enum: ["NGN", "USD", "EUR", "GBP"],
    },
    paymentStatus: {
      type: String,
      enum: ["successful", "pending", "failed"],
      default: "pending",
    },
    paymentGateway: {
      type: String,
      required: [true, "payment gateway is required"],
      enum: ["seerbit", ], 
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction
