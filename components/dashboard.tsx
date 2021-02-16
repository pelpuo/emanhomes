import { ApiClient } from 'admin-bro'
import { Box } from '@admin-bro/design-system'
import React, {useState, useEffect} from 'react'

const api = new ApiClient()

const Dashboard = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data)
    })
  }, [])

  return (
    <Box variant="grey">
    </Box>
  )
}

export default Dashboard