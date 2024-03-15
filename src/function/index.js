const axios = require('axios');
const api = "https://api.aerisapi.com/forecasts/"



exports.handler = async (event) => {

	console.log(JSON.stringify(event, undefined, 2));

	const apiPath = event.apiPath;

	let response;

	if (apiPath === '/weather') {
		const lat = event.parameters[0].value;
		const long = event.parameters[1].value;

		const weatherInfo = await getWeather(lat, long);
		console.log(weatherInfo);
		response = weatherInfo;
		console.log(response);
	}

	let result = {
		messageVersion: '1.0',
		response: {
			actionGroup: event.actionGroup,
			apiPath: event.apiPath,
			httpMethod: event.httpMethod,
			httpStatusCode: 200,
			responseBody: {
				'application/json': {
					body: response,
				},
			},
			sessionAttributes: {},
			promptSessionAttributes: {},
		},
	};

	console.log(result);
	return result;
};

async function getWeather(lat, long) {
	
    const client_id=process.env.CLIENT_ID; 
    const client_secret=process.env.CLIENT_SECRET;
	
    const url = `${api}${lat},${long}?from=today&to=today&client_id=${client_id}&client_secret=${client_secret}`;

	console.log(url);

	return axios.get(url).then((response) => {
		console.log(response.data);
		return response.data;
	});
}