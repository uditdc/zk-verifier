import { Container } from '@chakra-ui/react'
import BaseLayout from '../../components/layouts/BaseLayout'
import { DashboardInner, DashboardTitle, DashboardSubtitle, DashboardApp } from '..'
import { useRouter } from 'next/router'
import UserApp from '../../components/dashboard/UserApp'

export default function AppDetail() {
  const router = useRouter()
  const id = router.query.id as string


 
  return (
    <BaseLayout>
      <DashboardInner>
        <Container maxW='1200px'>
          <DashboardTitle>ZKWasm Verifier.</DashboardTitle>

          <DashboardApp>
            <UserApp id={id} />
          </DashboardApp>
        </Container>
      </DashboardInner>
    </BaseLayout>
  )
}
