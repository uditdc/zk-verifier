import { useCelo } from "@celo/react-celo"
import useSWR from 'swr'
import { fetcher } from "../utils/fetcher"

export interface UserApp {
  id: string
  chain?: number
  user?: string
  status?: 'success' | 'pending' | 'failed'
  setupStatus?: 'success' | 'pending' | 'failed'

  aux?: any
  instances?: any
  publicInputs?: any
  proof?: any
  proofStatus?: 'success' | 'pending' | 'failed'

  deployment?: any
  deploymentStatus?: 'success' | 'pending' | 'failed'

}

interface UseAppsResponse {
  apps: UserApp[]
  isLoading: boolean
  error: any
}

export const useApps = (): UseAppsResponse => {
  const { address } = useCelo()
  let apps = [] as UserApp[]

  const { data, error, isLoading } = useSWR(`http://zkwasm-explorer.delphinuslab.com:8080/tasks?user_address=${address}`, fetcher)

  const tasks = data ? data.result.data : []
  tasks.map((t: any) => {
    const id = t.md5

    // Insert app if not exists
    if (!apps.find(a => a.id === id)) {
      apps.push({ id })
    }

    // Insert app if not exists
    let foundApp = apps.find(a => a.id === id)!

    switch (t.task_type) {
      case 'Setup':
        foundApp.user = t.user_address
        foundApp.setupStatus = t.status === 'Done' ? 'success' : 'failed'
        break

      case 'Prove':
        foundApp.aux = t.aux
        foundApp.instances = t.instances
        foundApp.publicInputs = t.public_inputs
        foundApp.proof = t.proof
        foundApp.proofStatus = t.status === 'Done' ? 'success' : 'failed'
        break

      case 'Deploy':
        foundApp.chain = t.chain_id
        foundApp.deploymentStatus = t.status === 'Done' ? 'success' : 'failed'
        break
      default:
        break
    }

    if (foundApp.setupStatus === 'success' && foundApp.proofStatus === 'success' && foundApp.deploymentStatus === 'success') {
      foundApp.status = 'success'
    } else {
      foundApp.status = 'failed'
    }
  })

  return {
    apps,
    isLoading,
    error
  }
}