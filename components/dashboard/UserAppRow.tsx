import { Avatar, Badge, Box, Button, Td, Tr } from "@chakra-ui/react"
import styled from "styled-components"
import { UserApp } from "../../hooks/useApps"
import useSWR from 'swr'
import { fetcher } from "../../utils/fetcher"
import { useAppImage } from "../../hooks/useAppImage"
import { formatAddress } from "../../utils/strings"
import Link from "next/link"
import TableStatus from "../common/TableStatus"

interface UserAppRowProps {
  app: UserApp
}

export default function UserAppRow({ app }: UserAppRowProps) {
  const { appImage, error, isLoading } = useAppImage(app.id)
  const deployment = appImage?.deployment?.length > 0 ? appImage?.deployment[0] : null

  const status = 'success'
  const value = 'Success'
 
  return <Tr>
    <Td>
      <UserAppRowAvatar>
        <Avatar size='sm' src={appImage?.avator_url} />
        <strong>{formatAddress(app.id)}</strong>
      </UserAppRowAvatar>
    </Td>
    <Td>
      <TableStatus status={app.setupStatus || 'failed'} />
    </Td>
    <Td>
      <TableStatus status={app.proofStatus || 'failed'} />
    </Td>
    <Td><TableStatus status={app.deploymentStatus || 'failed'} /></Td>
    <Td>
      <Link href={`/apps/${app.id}`}>
        <Button
          isDisabled={app.deploymentStatus !== 'success'}>
          Verify
        </Button>
      </Link>
    </Td>
  </Tr>
}

const UserAppRowAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
