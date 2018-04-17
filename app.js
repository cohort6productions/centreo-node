const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://api.capsulecrm.com/api/v2/parties?perPage=100';
const headerConfig = {
	'headers': {
		'Authorization': 'Bearer ' + process.env.CAPSULE_AUTH_TOKEN
	}
};

app.get('/registration', (req, res) => {
	axios
		.get(BASE_URL, headerConfig)
		.then(result => {
			res.send(result.data.parties.map(company => company.name));
		})
		.catch(err => {
			res.send(err);
		});
});

app.listen(PORT, () => {
	console.log('Service started at port 8080')
});