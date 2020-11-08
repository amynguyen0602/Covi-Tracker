import React from 'react';
import { Popover, Tag, Button } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from "moment";

function TimelineItem({ event }) {
	const placeSummary = event.visits.slice(0, 2).map((place) => {
			return (
				<p key={place._id} style={{ marginTop: '10px' }}>
					{moment(place.date).format("DD-MMM-YYYY")}  <span style={{marginLeft: '15px'}}>{place.place}</span>
				</p>
			);
	});

	const placeDetails = event.visits.map((place) => {
		return (
			<p key={place._id}>
				{moment(place.date).format("DD-MMM-YYYY")} {moment(place.time).format("hh:MM A")}{' '}
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
			<span key = {eachProvince} style={{ color: '#c90711', fontWeight: 'bold' }}>{eachProvince}</span>
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
			<p>{moment(event.confirmedDate).format("DD-MMM-YYYY")}</p>
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
