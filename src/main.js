const api = require('./api');

//Number of total players
const playerCount = 99;

//The five randomly generated lotto number
const numbers = api.generateLottoNumbers();
//The randomly generated players
const players = api.generatePlayers(playerCount);
//The rewards for the winners
const rewards = api.readConfigJson();


api.checkPlayerHits(players, numbers);
api.calculatePlayerRewards(players, rewards);
api.orderPlayersByRewards(players);

api.writeCSV([
	numbers,
	...players.map(player => {
		return player.tips;
	})
]);

const totalRewardsPayed = api.summarizePlayerRewards(players);

console.log('Generated lotto numbers: ' + numbers.join(', '));
console.log('Lotto rewards: ' + rewards.join(', '));
console.log(`Summary of rewards: ${totalRewardsPayed}`);

console.log(`\nTop ten (of ${playerCount}) players with the highest rewards:`);
console.table(
	players.slice(0, 10).map(player => {
		player.tips = player.tips.join(', ');
		return player;
	})
);

