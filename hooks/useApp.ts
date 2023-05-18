import useSWR from 'swr'
import { fetcher } from "../utils/fetcher"
import { UserApp } from "./useApps"

interface UseAppResponse {
  app: UserApp
  isLoading: boolean
  error: any
}

export const useApp = (id: string): UseAppResponse => {
  let app = { id } as UserApp

  const { data, error, isLoading } = useSWR(`http://zkwasm-explorer.delphinuslab.com:8080/tasks?md5=${id}`, fetcher)

  const tasks = data ? data.result.data : []
  tasks.map((t: any) => {
    switch (t.task_type) {
      case 'Setup':
        app.user = t.user_address
        app.setupStatus = t.status === 'Done' ? 'success' : 'failed'
        break

      case 'Prove':
        app.aux = t.aux
        app.instances = t.instances
        app.publicInputs = t.public_inputs
        app.proof = t.proof
        app.proofStatus = t.status === 'Done' ? 'success' : 'failed'
        break

      case 'Deploy':
        app.chain = t.chain_id
        app.deploymentStatus = t.status === 'Done' ? 'success' : 'failed'
        break
      default:
        break
    }

    if (app.setupStatus === 'success' && app.proofStatus === 'success' && app.deploymentStatus === 'success') {
      app.status = 'success'
    } else {
      app.status = 'failed'
    }
  })

  return {
    app,
    isLoading,
    error
  }
}