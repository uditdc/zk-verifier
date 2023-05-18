import { Container, IconButton } from "@chakra-ui/react"
import styled from "styled-components"
import { RiWallet2Line, RiRecycleLine, RiGitBranchLine, RiGithubLine } from "react-icons/ri";
import { useRouter } from 'next/router'
import Link from "next/link"
import UserAccounts from "../dashboard/UserAccounts"

export default function Header() {
  const router = useRouter()

  return (
    <HeaderWrap>
      <Container maxW='1200px'>
        <HeaderInner>
          <HeaderLogo>
            <Link href='/'>
              <img src="/apple-icon.png" alt="BLS" />  
            </Link>
          </HeaderLogo>

          <HeaderAuth>
            <UserAccounts />
          </HeaderAuth>
        </HeaderInner>
      </Container>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EDEEF0;

  padding: 1rem 2rem;

  @media screen and (min-width: 768px) {
    padding: 1rem 4rem;
  }
`

const HeaderLogo = styled.div`
  img {
    width: 2.5rem;
  }
`

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderAuth = styled.div`
`