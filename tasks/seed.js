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
	const adHash = await bcrypt.hash(adPassword, 15);
    await admin.create(adName, adHash);
    
	console.log('Done!');
	await db.serverConfig.close();
}

main().catch(console.log);