// src/utils/connectArgentWallet.js

export const connectArgentWallet = async () => {
    try {
      const argentWebWallet = (await import("./argentWallet")).default;

      const response = await argentWebWallet.requestConnection({
        callbackData: "custom_callback_data",
        approvalRequests: [
          {
            tokenAddress: "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
            amount: BigInt("100000000000000000").toString(),
            spender: "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
          },
        ],
      });

      return response.account;
    } catch (error) {
      console.error("Failed to connect Argent wallet:", error);
      throw error; // propagate to be handled by caller
    }
  };
