const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const admin = data.admin

async function main() {
	const db = await dbConnection();
	await db.dropDatabase();
    const john = await admin.create('johnsmith1234',hashedPassword);
	const id = john._id;
    
    //await posts.create(id, img, caption, time);

	await db.serverConfig.close();
	
	console.log('Done!');
}

main();