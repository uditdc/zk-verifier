import { useCelo } from "@celo/react-celo"
import { Button } from "@chakra-ui/react"
import styled from "styled-components"
import { formatAddress } from "../../utils/strings"

interface UserAccountsProps { }

export default function UserAccounts({ }: UserAccountsProps) {
  const { disconnect, connect, initialised, account, address } = useCelo()

  return <UserAccountsWrap>
    <UserAccountsInner>
      {
        initialised && account && (
          <>
            {/* <UserAccountsLabel>
              <strong>Connected to CELO</strong>
              <small>{formatAddress(address)}</small>
            </UserAccountsLabel>
             */}
            <UserAccountsAction>
              <Button
                colorScheme="red"
                onClick={() => disconnect().catch(() => { })}>
                Disconnect
              </Button>
            </UserAccountsAction>
          </>
        )
      }
      {
        !(initialised && account) && (
          <>
            <UserAccountsAction>
              <Button
                colorScheme="blue"
                onClick={() => connect().catch(() => { })}>
                Connect Wallet
              </Button>
            </UserAccountsAction>
          </>
        )
      }
    </UserAccountsInner>
  </UserAccountsWrap>
}

const UserAccountsWrap = styled.div`
  
`

const UserAccountsInner = styled.div`
    display: flex;
    flex-direction: column;
    
    @media screen and (min-width: 768px) {
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
`

const UserAccountsLabel = styled.div`
  display: flex;
  flex-direction: column;

  small {
    font-weight: 600;
    color: var(--bls--grey-05);
  }
`

const UserAccountsAction = styled.div`
  margin-top: 1rem;

  @media screen and (max-width: 767px) {
    button {
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
    margin-top: 0;
  }
`