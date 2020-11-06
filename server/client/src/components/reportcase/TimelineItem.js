import React from 'react';
import { Popover, Tag, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function TimelineItem({ event }) {
	const placeSummary = event.visits.map((place) => {
			return (
				<p key={place._id} style={{ marginTop: '10px' }}>
					{place.date} {place.place} 
				</p>
			);
	});

	const placeDetails = event.visits.map((place) => {
		return (
			<p key={place._id}>
				{place.date} {place.time}{' '}
				<Link to="/map">
					{place.place}
				</Link>
			</p>
		);
	});

	const tags = event.visits.map((place) => {
		return place.city;
	});

	const provinces = event.visits.map((place) => place.province)
	const uniqueProvince = provinces.filter((val, idx) => {
		return provinces.indexOf(val) === idx;
	})

	const province = uniqueProvince.map((eachProvince) => {
		return (
			<span style={{ color: '#c90711', fontWeight: 'bold' }}>{eachProvince}</span>
		);
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
			<p>{event.confirmedDate}</p>
			<Popover
				content={placeDetails}
				title={province}
				trigger="hover"
			>
				<Button type="primary" icon={<MoreOutlined />} style={{ float: 'right' }}>
					More
				</Button>
			</Popover>
			<h3 style={{ color: '#c90711', fontWeight: 'bold' }}>{province}</h3>
			{tag}
			{placeSummary}
		</div>
	);
}

export default TimelineItem;
