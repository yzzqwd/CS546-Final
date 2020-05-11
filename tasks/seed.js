const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const admin = data.admin

async function main() {
	const db = await dbConnection();
	await db.dropDatabase();

    const patrick = await admin.create('Patrick', 'Hill', 'phill546', 'Male', 'phill@stevens.edu', 'Hoboken', 'New Jersey', '30', '$2y$15$uSYzHNt2iabWJPlxO57J2.2knV.43SxxuZQPxmX3krPMnKNfG7tgy');
    
    const john = await users.create('John', 'Smith','johnsmith1234', 'Male', 'jsmith@gmail.com', 'Albany', 'New York', '20', '$2y$15$DtoFWeXCmMYpS4khcj2d3uzbHn6r45NDoq9HU8MgiC5UMYGpK/ngy');
	const id = john._id;
    
    //await posts.create(id, img, caption, time);

	await db.serverConfig.close();
	
	console.log('Done!');
}

main();