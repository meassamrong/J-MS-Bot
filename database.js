const fs = require('fs');
const dataStoreFile = "./src/createChannelsLog.json";
const database = {
  // Function to push data to JSON file
  pushData(userData) {
    // read the JSON file
    const data = JSON.parse(fs.readFileSync(dataStoreFile));
    // add a new user
    //data.users.push({ id: 3, name: 'Jack' });
    data.usersChannels.push(userData)
    // write the updated data to the JSON file
    fs.writeFileSync(dataStoreFile, JSON.stringify(data));
  },
  pullData(UserChannelsID) {
    // read the JSON file
    const data = JSON.parse(fs.readFileSync(dataStoreFile))
    // get all the users
    const users = data.usersChannels;
    return UserChannelsID = users;
  },
  deleteData(oldSataeChannelsID) {
    // read the JSON file
    const data = JSON.parse(fs.readFileSync(dataStoreFile));
    data.usersChannels = data.usersChannels.filter((usersChannels) => usersChannels.channelID !== oldSataeChannelsID);

    // write the updated data to the JSON file
    fs.writeFileSync(dataStoreFile, JSON.stringify(data));
  }

}
module.exports = database;