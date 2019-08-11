const LivingRoom = require("../../models/LivingRoom")

const createRoom = async (user) => {
    const count = {
        "Male": 3,
        "Female": 3
    }
    const males = await User.find({ gender: "Male", livingroom: null });
    const females = await User.find({ gender: "Female", livingroom: null });

    console.log("MALES", males)
    console.log("FEMALES", females)
    console.log("COUNT OBJ", count)

    count[user.gender] -= 1
    
      if (males.length >= count["Male"] && females.length >= count["Female"]) {
        const newLivingRoom = new LivingRoom();
        newLivingRoom.usersInRoom.push(user);
        try {
            for (let i = 0; i < count["Male"]; i++) {
                if (user !== males[i]) {
                    newLivingRoom.usersInRoom.push(males[i]);
                } else {
                    count["Male"] += 1
                }
            }
            for (let i = 0; i < count["Female"]; i++) {
                if (user !== female[i]) {
                    newLivingRoom.usersInRoom.push(females[i]);
                } else {
                    count["Female"] += 1
                }
            }
            await newLivingRoom.save()
        } catch (e) {
            console.log(e)
        }
      }
    
}

module.exports = {
    createRoom
}


