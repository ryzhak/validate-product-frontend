import axios from 'axios';

import * as config from './config.json';

/**
 * Creates a new action
 * @param {string} actionName action name performed by user 
 */
async function createAction(actionName) {
	const body = {
		project: config.PROJECT_NAME,
		action: actionName
	};
	return await axios.post(`${config.API_URL}/action`, body);
}

/**
 * Registers a new user by email
 * @param {string} email user email 
 */
async function signup(email) {
	const body = {
		project: config.PROJECT_NAME,
		email
	};
	return await axios.post(`${config.API_URL}/signup`, body);
}

export default {
	createAction,
	signup
};
