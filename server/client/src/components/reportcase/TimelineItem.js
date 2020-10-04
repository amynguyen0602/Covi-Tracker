import React from 'react';
import { Popover, Tag, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function TimelineItem({ event }) {
	const placeSummary = event.places.map((place) => {
		if (place.id < 3)
			return (
				<p key={place.id} style={{ marginTop: '10px' }}>
					{place.date} {place.address} {place.city}
				</p>
			);
		else return null;
	});

	const placeDetails = event.places.map((place) => {
		return (
			<p key={place.id}>
				{place.date} {place.time}{' '}
				<Link to="/map">
					{place.address} {place.city}
				</Link>
			</p>
		);
	});

	const tags = event.places.map((place) => {
		return place.city;
	});

	const uniqueTags = tags.filter((val, idx) => {
		return tags.indexOf(val) === idx;
	});

	const tag = uniqueTags.map((city) => {
		return (
			<Tag style = {{'borderRadius': '30px'}} key={city} color="blue">
				{city}
			</Tag>
		);
	});

	return (
		<div>
			<p>{event.date}</p>
			<Popover
				content={placeDetails}
				title={<span style={{ color: '#c90711', fontWeight: 'bold' }}>{event.provinceName}</span>}
				trigger="hover"
			>
				<Button type="primary" icon={<MoreOutlined />} style={{ float: 'right' }}>
					More
				</Button>
			</Popover>
			<h3 style={{ color: '#c90711', fontWeight: 'bold' }}>{event.province}</h3>
			{tag}
			{placeSummary}
		</div>
	);
}

export default TimelineItem;
