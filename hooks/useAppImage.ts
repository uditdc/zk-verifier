import useSWR from 'swr'
import { fetcher } from "../utils/fetcher"

export interface UserAppImage {
  deployment: any[]
}

interface UseAppImageResponse {
  appImage: any
  isLoading: boolean
  error: any
}

export const useAppImage = (id: string): UseAppImageResponse => {
  const { data, error, isLoading } = useSWR(`https://zkwasm-explorer.delphinuslab.com:8090/image?md5=${id}`, fetcher)

  const appImage = (data && data.result.length > 0) ? data.result[0] : []
  
  return {
    appImage,
    isLoading,
    error
  }
}