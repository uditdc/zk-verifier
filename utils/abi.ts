export const VERIFIER_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract AggregatorVerifierCoreStep[]",
        "name": "_steps",
        "type": "address[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "proof",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "verify_instance",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "aux",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[][]",
        "name": "target_instance",
        "type": "uint256[][]"
      }
    ],
    "name": "verify",
    "outputs": [],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]