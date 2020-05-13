const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const admin = data.admin;
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
	await users.create("John", "Smith", "jsmith1234", "male" , "jsmith@gmail.com", "Hoboken" , "NJ" , "30" , "userHash");
    
	console.log('Done!');
	await db.serverConfig.close();
}

main().catch(console.log);