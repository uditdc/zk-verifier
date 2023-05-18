import { ethers, BigNumber } from 'ethers'
import BN from "bn.js"

// export function bytesToBN(bytes: Uint8Array): BigNumber {
//   const hexString = ethers.utils.hexlify(bytes)
//   return ethers.BigNumber.from(hexString)
// }

export function bytesToBN(data: Uint8Array) {
  let chunksize = 64;
  let bns = [];
  for (let i = 0; i < data.length; i += 32) {
    const chunk = data.slice(i, i + 32);
    let a = new BN(chunk,'le');
    bns.push(a);
    // do whatever
  }
  return bns;
}

// Convert a hex string to a byte array
function hexToBNs(hexString: string): Array<BN> {
  let bytes = new Array(hexString.length / 2)
  for (var i = 0; i < hexString.length; i += 2) {
    bytes[i] = new BN(hexString.slice(i, i + 2), 16)
  }
  return bytes
}

export function parseArg(input: string): Array<BN> | null {
  let inputArray = input.split(":")
  let value = inputArray[0]
  let type = inputArray[1]
  let re1 = new RegExp(/^[0-9A-Fa-f]+$/) // hexdecimal
  let re2 = new RegExp(/^\d+$/) // decimal

  // Check if value is a number
  if (!(re1.test(value.slice(2)) || re2.test(value))) {
    console.log("Error: input value is not an interger number")
    return null
  }

  // Convert value byte array
  if (type == "i64") {
    let v: BN
    if (value.slice(0, 2) == "0x") {
      v = new BN(value.slice(2), 16)
    } else {
      v = new BN(value)
    }
    return [v]
  } else if (type == "bytes" || type == "bytes-packed") {
    if (value.slice(0, 2) != "0x") {
      console.log("Error: bytes input need start with 0x")
      return null
    }
    let bytes = hexToBNs(value.slice(2))
    return bytes
  } else {
    console.log("Unsupported input data type: %s", type)
    return null
  }
}

export function parseArgs(raw: Array<string>): Array<BN> {
  let parsedInputs = new Array()
  for (var input of raw) {
    input = input.trim()
    if (input !== "") {
      let args = parseArg(input)
      if (args != null) {
        parsedInputs.push(args)
      } else {
        throw Error(`invalid args in ${input}`)
      }
    }
  }
  return parsedInputs.flat()
}