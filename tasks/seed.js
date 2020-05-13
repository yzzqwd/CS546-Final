const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const admin = data.admin;
const health = data.health
const exercise = data.exercise
const bcrypt = require('bcryptjs');

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();

	const adName = 'admin';
	const adPassword = 'PatrickHill';
	const userPassword = 'JohnSmith1234';
	const adHash = await bcrypt.hash(adPassword, 15);
	const userHash = await bcrypt.hash(userPassword, 15);
	await admin.create(adName, adHash);
	let john = await users.create("John", "Smith", "jsmith1234", "male" , "jsmith@gmail.com", "Hoboken" , "NJ" , "30" , userHash);
	let userID = john._id
	await health.create(userID)
	await exercise.create(userID)
    
	console.log('Done!');
	await db.serverConfig.close();
}

main().catch(console.log);