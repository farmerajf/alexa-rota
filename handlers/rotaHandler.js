var model = {
    nextPersonId: "adam-farmer",
    people: [
        {
            id: "adam-farmer",
            nickname: "Adam",
            purchases: [

            ]
        },
        {
            id: "ashley-nolan",
            nickname: "Ashley",
            purchases: [

            ]
        }
    ]
};

function getNextPersonName(model) {
    var nextPerson = model.people.filter((x) => x.id == model.nextPersonId)[0];
    console.log(nextPerson);
    return nextPerson.nickname;
}

module.exports = {
    'NextPersonIntent': function() {
        this.emit(":tell", "<audio src='https://s3.amazonaws.com/cookie-monster-sounds/Hom-converted.mp3' /> Cookie monster said, the next person to buy cookies is " + getNextPersonName(model));
        //this.response.speak("Cookie monster said, the next person to buy cookies is " + getNextPersonName(model))
        //.audioPlayerPlay("REPLACE_ALL", "https://s3.amazonaws.com/cookie-monster-sounds/Hom+nom+nom+nom+nom.mp3","blah");
        //this.emit(":responseReady");
    }
}