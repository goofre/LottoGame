import api from '../api';

describe('Lotto Test Suite', () => {

	it('is lotto number generator test', () => {
		let actual = api.generateLottoNumbers();
		expect(actual).toBeArrayOfSize(5);
		actual.forEach((element) => {
			expect(element).toBeWithin(1, 90);
		});
	});

	it('is a lotto player generator test', () => {
		let actual = api.generatePlayers(1);
		expect(actual).toBeArrayOfSize(1);
		expect(actual[0]).toContainAllKeys(['id', 'tips']);
		expect(actual[0].id).toBeNumber();
	});

	it('is a config read test', () => {
		let actual = api.readConfigJson();
		expect(actual).not.toBeFalsy();
	});

	it('is a file write test', () => {
		let actual = api.writeCSV([[]]);
		expect(actual).not.toBeFalsy();
	});

	it('is a number comparing test', () => {
		let actual = api.compareLottoNumbers([1, 2, 3, 4, 5], [4, 5, 6, 7, 8]);
		expect(actual).toBe(2);
	});

	it('is a player hit checker', () => {
		let players = api.generatePlayers(1);
		let numbers = api.generateLottoNumbers();
		api.checkPlayerHits(players, numbers);
		expect(players[0]).toContainKeys(['hits']);
		expect(players[0].hits).toBeNumber();
	});

	it('is a player reward calculator', () => {
		let players = api.generatePlayers(1);
		let prizes = api.readConfigJson();
		api.calculatePlayerRewards(players, prizes);
		expect(players[0]).toContainKeys(['reward']);
		expect(players[0].reward).toBeNumber();
	});

	it('is a summarizing test', () => {
		let players = api.generatePlayers(1);
		let numbers = api.generateLottoNumbers();
		let prizes = api.readConfigJson();
		api.checkPlayerHits(players, numbers, prizes);
		let actual = api.summarizePlayerRewards(players);
		expect(actual).toBeNumber();
	});

	it('is extends a text with spaces', () => {
		expect(api.extendWithSpaces('abc', 5).length).toBe(5);
	});
});
