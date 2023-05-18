import styled from "styled-components"
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useApps } from "../../hooks/useApps"
import UserAppRow from "./UserAppRow"
import { useState } from "react"

interface UserAppsProps {}

export default function UserApps({}: UserAppsProps) {
  const { apps, error, isLoading } = useApps()

  return (
    <UserAppsWrap>
      {
        apps.length > 0 && (
          <Card>
            <CardHeader>
              <Heading size='md' mb={0}>User Functions</Heading>
            </CardHeader>

            <CardBody>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Function</Th>
                      <Th>Status</Th>
                      <Th>Proof</Th>
                      <Th>Deployment</Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      apps.map((a, i) => (
                        <UserAppRow key={i} app={a} />
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        )
      }
      {
        apps.length <= 0 && (
          <Flex direction='column' alignItems='center' justifyContent='center' textAlign='center' minH='250px'>
            <Heading as='h2' size='md'>Connect Wallet or enter a ZKWasm function ID below</Heading>
            <Input maxW={400} />
          </Flex>
        )
      }
    </UserAppsWrap>
  );
}

const UserAppsWrap = styled.div`
  background-color: #fff;
  border-radius: 4px;
`;

const UserAssetsInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserAssetsHeader = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-gap: 1rem;
  background-color: #d2d2d2;
  border-radius: 4px;
`;
const UserAssetsHeaderItem = styled.div`
  text-transform: uppercase;
  font-size: 0.625rem;
  font-weight: bold;
  color: #8c8c8c;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1.5rem;

  &:last-child {
    text-align: right;
  }
`;

const UserAssetsList = styled.div``;

const UserAssetsListItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
`;

const UserAssetsListItemInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  min-height: 120px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const UserAssetsListItemIcon = styled.div`
  margin-right: 1rem;

  img {
    width: 2rem;
  }
`;

const UserAssetsListItemName = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
`;
const UserAssetsListItemBalance = styled.div`
  font-size: 1.5rem;

  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  @media screen and (min-width: 768px) {
    text-align: right;
    justify-content: flex-end;
    margin-top: 0;
  }

  small {
    font-size: 0.875rem;
  }
`;
const UserAssetsListItemAction = styled.div`
  padding: 0.5rem;
  text-align: center;

  small {
    color: var(--bls--text-muted);
  }

  button {
    width: 100%;
  }
`;
