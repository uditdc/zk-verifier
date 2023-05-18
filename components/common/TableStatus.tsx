import { Badge, Box, Icon, Text } from '@chakra-ui/react'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import React from 'react'

interface TableStatusProps {
  status?: 'success' | 'pending' | 'failed'
}

const TableStatus: React.FC<TableStatusProps> = ({ status }) => {
  const renderIcon = () => {
    if (status === 'success') {
      return <Icon as={FiCheckCircle} color="green.500" mr={2} />
    } else if (status === 'failed') {
      return <Icon as={FiAlertCircle} color="red.500" mr={2} />
    }
    return null
  }

  return (
    <Box display="flex" alignItems="center">
      {renderIcon()}
      <Badge colorScheme={status === 'success' ? 'green' : 'red'}>
        {status}
      </Badge>
    </Box>
  )
}

export default TableStatus
