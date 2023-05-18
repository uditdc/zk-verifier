import { ethers } from "ethers"
import { VERIFIER_CONTRACT_ABI } from "../utils/abi"
import { bytesToBN, parseArgs } from "../utils/bytes"
import { UserAppImage } from "./useAppImage"
import { UserApp } from "./useApps"
import { useState } from "react"
import Web3 from 'web3';

interface UseAppVerifyResponse {
  doVerify: any
  result: string | null
  isVerified: boolean
  isLoading: boolean
  error: any
}

export const useAppVerify = (): UseAppVerifyResponse => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const doVerify = async (app: UserApp, appImage: UserAppImage) => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    
    try {
      const address = appImage.deployment.length > 0 ? appImage.deployment[0].address : null
      const inputs = parseArgs(app.publicInputs).map((x: any)=> x.toString(10))
      const proof = bytesToBN(app.proof)
      const instances = bytesToBN(app.instances)
      const aux = bytesToBN(app.aux)
    
      // const provider = new ethers.providers.JsonRpcProvider('https://alfajores-forno.celo-testnet.org')
      // const contract = new ethers.Contract(address, VERIFIER_CONTRACT_ABI as any, provider)
      // let result = await contract.verify(app.proof, app.instances, app.aux, [inputs])

      const web3 = new Web3(new Web3.providers.HttpProvider('https://alfajores-forno.celo-testnet.org'));
      const contract = new web3.eth.Contract(VERIFIER_CONTRACT_ABI as any, address);

      const result = await contract.methods.verify(proof, instances, aux, [inputs]).call();

      setResult(result.data)
      setIsVerified(true)
    } catch (error: any) {
      console.log('error', error)
      setError(error.toString())
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isVerified,
    isLoading,
    result,
    error,
    doVerify
  }
}