const fs = require('fs');
const path = require('path');


/**
 * This function generates an array of 5 unique numbers, each between 1 and 90
 * */
const generateLottoNumbers = () => {
	let numbers = [];
	while (numbers.length < 5) {
		let randomNum = Math.floor(Math.random() * 89) + 1;
		!numbers.includes(randomNum) && numbers.push(randomNum);
	}
	return numbers;
};

/**
 * This function generates an array with N players.
 * Each player has a unique number, and a random lotto tip
 * */
const generatePlayers = (num) => {
	let players = [];
	for (let i = 0; i < num; i++) {
		players.push({
			id: i,
			tips: generateLottoNumbers()
		});
	}
	return players;
};

/**
 * This function reads the lotto.json file
 * */
const readConfigJson = () => {
	try {
		let fileData = fs.readFileSync(path.resolve('src/config.json'), 'utf8');
		let fileObj = JSON.parse(fileData);
		if (!fileObj) return false;
		return fileObj;
	} catch (err) {
		console.error(err);
		return false;
	}
};

/**
 * This function creates the output.json file
 * */
const writeCSV = (data) => {
	try {
		fs.writeFileSync('src/output.json',
			data.map(numbers => {
				return numbers.join(',');
			}).join('\n')
		);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
};

/**
 * This function compares two arrays of numbers and counts matching elements
 * */
const compareLottoNumbers = (numbersA, numbersB) => {
	let hits = 0;
	numbersA.forEach(numA => {
		numbersB.includes(numA) && hits++;
	});
	return hits;
};

/**
 * This function gives each player object
 * - a hits property, with the number of the actual hits
 * - a reward property, with the prize for the hits
 * */
const checkPlayerHits = (players, numbers) => {
	for (let i = 0; i < players.length; i++) {
		players[i].hits = compareLottoNumbers(players[i].tips, numbers);
	}
};

/**
 * This function gives each player object
 * - a hits property, with the number of the actual hits
 * - a reward property, with the prize for the hits
 * */
const calculatePlayerRewards = (players, prizes) => {
	for (let i = 0; i < players.length; i++) {
		players[i].reward = players[i].hits > 0 ? prizes[players[i].hits - 1] : 0;
	}
};


/**
 * This function summarizes the player rewards
 * */
const summarizePlayerRewards = (playersWithRewards) => {
	let sum = 0;
	playersWithRewards.forEach(player => {
		sum += player.reward;
	});
	return sum;
};

/**
 * This function orders descending the players by the given reward
 * */
const orderPlayersByRewards = (playersWithRewards) => {
	playersWithRewards.sort((a, b) => b.reward - a.reward);
};

/**
 * This function is for formatting purposes
 * */
const extendWithSpaces = (string, totalLength) => {
	return (string + ' '.repeat(totalLength)).substr(0, totalLength);
};

module.exports = {
	generateLottoNumbers: generateLottoNumbers,
	generatePlayers: generatePlayers,
	readConfigJson: readConfigJson,
	writeCSV: writeCSV,
	compareLottoNumbers: compareLottoNumbers,
	checkPlayerHits: checkPlayerHits,
	calculatePlayerRewards: calculatePlayerRewards,
	summarizePlayerRewards: summarizePlayerRewards,
	orderPlayersByRewards: orderPlayersByRewards,
	extendWithSpaces: extendWithSpaces
};
