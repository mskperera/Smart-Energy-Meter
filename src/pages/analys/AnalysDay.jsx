import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip  } from 'recharts';


function AnalysDay(title, chartDataDay, chartKeys, index) {

    
  return (
    <div>
        <div key={title} className="chart-card">
                <div className="chart-title">{title}</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={chartDataDay}  style={{ margin: '0 auto' }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey={chartKeys[title]} 
                      stroke={
                        index === 0 ? '#3B82F6' :
                        index === 1 ? '#EF4444' :
                        index === 2 ? '#F59E0B' :
                        index === 3 ? '#10B981' :
                        '#6366F1'
                      }
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
    </div>
  )
}

export default AnalysDay