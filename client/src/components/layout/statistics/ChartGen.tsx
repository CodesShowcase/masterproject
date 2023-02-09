import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { REST_API } from '../../../utils/constants'

interface statKeys {
  [key: string]: string | number;
}

interface stats extends statKeys{
  timeframe: string
  e5low: number
  e5avg: number
  e5high: number
  e10low: number
  e10avg: number
  e10high: number
  diesellow: number
  dieselavg: number
  dieselhigh: number
}

export function ChartGen({ horizon }: { horizon: string }) {
  const [myArray, setMyArray] = useState<stats[]>([])
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJUaGUiLCJsYXN0bmFtZSI6IkFkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ2FzcHJpY2VzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHk1U1c0bDl4cWNvOWFmMHdRUUgxYU9iUkZDbjM5UktBcUNyaVFEL1VxMGg5NmhIZklxeW4yIiwidXNlcmxldmVsIjoiYWRtaW4ifSwiaWF0IjoxNjY0ODA0OTYyfQ.vFoF4AxoPfd0MYJkO63512AZ6McwCyJ74PzFD48Nc48'

  useEffect(() => {
    const getMyData = async () => {
        const response = await fetch(`${REST_API}/api/stats/admin/${horizon}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        })
        const result = await response.json()
        for (const x in result) {
          result[x].timeframe = (horizon === 'hourly') ? result[x].timeframe.slice(-8).slice(0,5) : result[x].timeframe.slice(0,10)
          result[x].e10low = (result[x].e10low == null) ? "1.4" : (result[x].e10low/1000).toFixed(2)
          result[x].e10avg = (result[x].e10avg == null) ? "1.4" : (result[x].e10avg/1000).toFixed(2)
          result[x].e10high = (result[x].e10high == null) ? "1.4" : (result[x].e10high/1000).toFixed(2)
          result[x].e5low = (result[x].e5low == null) ? "1.4" : (result[x].e5low/1000).toFixed(2)
          result[x].e5avg = (result[x].e5avg == null) ? "1.4" : (result[x].e5avg/1000).toFixed(2)
          result[x].e5high = (result[x].e5high == null) ? "1.4" : (result[x].e5high/1000).toFixed(2)
          result[x].diesellow = (result[x].diesellow == null) ? "1.4" : (result[x].diesellow/1000).toFixed(2)
          result[x].dieselavg = (result[x].dieselavg == null) ? "1.4" : (result[x].dieselavg/1000).toFixed(2)
          result[x].dieselhigh = (result[x].dieselhigh == null) ? "1.4" : (result[x].dieselhigh/1000).toFixed(2)
        }
        setMyArray(result)
    }
    getMyData();
  }, [horizon])

  if (myArray.length != 0) {
    return (
      <React.Fragment>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={myArray}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timeframe" />
            <YAxis type="number" domain={[1.4, 2.0]}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="e10low" fill="#8a2be2" />
            <Bar dataKey="e10avg" fill="#4a1e9e" />
            <Bar dataKey="e10high" fill="#ddcbff" />
            <Bar dataKey="e5low" fill="#ff00ff" />
            <Bar dataKey="e5avg" fill="#7700b3" />
            <Bar dataKey="e5high" fill="#eabfff" />
            <Bar dataKey="diesellow" fill="#0000ff" />
            <Bar dataKey="dieselavg" fill="#002db3" />
            <Bar dataKey="dieselhigh" fill="#bfcfff" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <ResponsiveContainer width="100%" height="100%">
          <image><img src="/assets/images/we-have-no-data-yet.jpg" /></image>
        </ResponsiveContainer>
      </React.Fragment>
    )
  }
}
