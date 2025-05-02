import { ArgentWebWallet } from "@argent/invisible-sdk";





const argentWebWallet = ArgentWebWallet.init({
    environment: "sepolia", // "sepolia" | "mainnet" (Whitelisting required)
    appName: "My App", // Your app name
    sessionParams: {
      allowedMethods: [
        // List of contracts/methods allowed to be called by the session key
        {
          contract:
            "0x036133c88c1954413150db74c26243e2af77170a4032934b275708d84ec5452f", // contract address
          selector: "increment", //function selector
        }
      ],
      validityDays: 30 // optional - session validity (in days) - default: 30
    },
    paymasterParams: {
      apiKey: "avnu paymaster api key"
    }
  });


  export default argentWebWallet;