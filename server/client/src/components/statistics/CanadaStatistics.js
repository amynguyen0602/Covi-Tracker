import React, { Component } from 'react';
import { Card } from 'antd';

export class CanadaStatistics extends Component {
	render() {
		return (
			<Card
				style={{ margin: '20px 10px 20px 10px', boxShadow: '1px 1px 10px 2px #F0F0F0' }}
				title={
					<div>
						<img alt="" src="/canada-flag.png" style={{ width: '20px' }} />
						<span style={{
								padding: '10px',
								position: 'relative',
								top: '2px',
								fontWeight: 'bold',
							}}> Canada </span>
					</div>
				}
			></Card>
		);
	}
}

export default CanadaStatistics;
