import React from 'react'
import { Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

function StatisticCard({data}) {
    return (
        <Statistic title={data.title}
			value={data.total}
			suffix={data.change > 0 ? 
                <div style={{fontSize: '11px', color: '#3f8600'}}><ArrowUpOutlined /> {data.change}</div> :
                data.change < 0 ? 
				<div style={{fontSize: '11px', color: '#cf1322'}}><ArrowDownOutlined />  {-data.change}</div> : null}
          	/>
    )
}

export default StatisticCard
