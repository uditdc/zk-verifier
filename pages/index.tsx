import { Container } from '@chakra-ui/react'
import styled from 'styled-components'
import BaseLayout from '../components/layouts/BaseLayout'
import UserApps from '../components/dashboard/UserApps'
import { useCelo } from '@celo/react-celo'

export default function Dashboard() {
  const { address } = useCelo()

  console.log('address', address)
  
  return (
    <BaseLayout>
      <DashboardInner>
        <Container maxW='1200px'>
          <DashboardTitle>ZKWasm Verifier.</DashboardTitle>

          <DashboardApp>
            <UserApps />
          </DashboardApp>

        </Container>
      </DashboardInner>
    </BaseLayout>
  )
}

export const DashboardInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  height: 100%;

  @media screen and (min-width: 768px) {
    padding: 2rem 4rem 4rem;
  }
`

export const DashboardTitle = styled.div`
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: bold;

  @media screen and (min-width: 768px) {
    font-size: 4rem;
  }

  @media screen and (min-width: 992px) {
    max-width: 60%;
  }
`

export const DashboardSubtitle = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media screen and (min-width: 992px) {
    max-width: 60%;
  }
`

export const DashboardApp = styled.div`
  flex: 1;
  margin-top: 4rem;
`

export const DashboardFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  margin-top: 4rem;

  background-color: #fafafa;
  border-radius: 8px;

  padding: 1rem;

  span {
    font-size: 0.875rem;
    color: #8c8c8c;
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 1.125rem;
  }

  img {
    height: 1.5rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > div {
      display: flex;
    }
  }
`