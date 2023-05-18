import styled from "styled-components"
import { useApp } from "../../hooks/useApp"
import { useAppImage } from "../../hooks/useAppImage"
import { UserApp } from "../../hooks/useApps"
import { Avatar, Box, Button, Card, CardBody, CardHeader, Code, Flex, Heading, Stack, StackDivider, Text } from "@chakra-ui/react"
import { useAppVerify } from "../../hooks/useAppVerify"
import { formatAddress } from "../../utils/strings"
import TableStatus from "../common/TableStatus"
import { RiExternalLinkLine } from "react-icons/ri"

interface UserAppProps {
  id: string
}

export default function UserApp({ id }: UserAppProps) {
  const { app, } = useApp(id)
  const { appImage } = useAppImage(id)
  const { isVerified, isLoading: isVerifyLoading, error: verifyError, result: verifyResult, doVerify } = useAppVerify()

  const address = appImage?.deployment?.length > 0 ? appImage?.deployment[0].address : null

  return (
    <UserAppWrap>
      <Card mb={10}>
        <CardHeader>
          <Flex alignItems='center'>
            <Avatar size='lg' mr={2} src={appImage?.avator_url} />
            <Heading size='md' mb={0}>{app.id}</Heading>
          </Flex>
        </CardHeader>

        <CardBody>
          {
            address && (
              <UserAppContract>
                <div>
                  <span>Celo Contract</span>
                  <div>
                    <a href="https://explorer.celo.org/alfajores/address/0xc44831f5f424A95465720bda94110AB0140Afc93/contracts" target="_blank" rel="noopener noreferrer">
                      {formatAddress(address)}
                    </a>
                    &nbsp;
                    <RiExternalLinkLine />
                  </div>
                </div>

                <div>
                  <Button
                    colorScheme='blue'
                    isLoading={isVerifyLoading}
                    onClick={() => doVerify(app, appImage)}>
                    Verify on CELO
                  </Button>
                  
                  {
                    isVerified && !verifyError && (
                      <Flex mt={2}>
                        <TableStatus status="success" />
                      </Flex>
                    )
                  }
                </div>

              </UserAppContract>
            )
          }

          {
            !!verifyError && (
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Error
                </Heading>
                <Code>
                  {verifyError}
                </Code>
              </Box>
            )
          }
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Inputs
              </Heading>
              <Code>
                {app.publicInputs}
              </Code>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Proofs
              </Heading>
              <Code>
                {app.proof}
              </Code>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Instances
              </Heading>
              <Code>
                {app.instances}
              </Code>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Aux
              </Heading>
              <Code>
                {app.aux}
              </Code>
            </Box>
          </Stack>
        </CardBody>
      </Card>

    </UserAppWrap>
  )
}

const UserAppWrap = styled.div`

code {
  padding: 1rem;
  max-width: 100%;
  max-height: 250px;
  overflow: auto;
}
`

const UserAppVerifyResult = styled.div`
  
`

const UserAppVerifyResultStatus = styled.div`
  
`

const UserAppContract = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
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