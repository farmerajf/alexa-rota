function log(message) {
    console.log(message);
}

function respond(context, response) {
    log("Response: " + response);
    context.emit(":tell", response);
}

function getModel(context) { 
    log("Getting model")
    var model = context.attributes['model'];
    log("Got model: " + JSON.stringify(model));
    if (model === undefined) {
        log("Model was empty so setting to deafult");
        model = {
            nextPersonIndex: 0,
            people: [
            ]
        };
    }

    log("Using model: " + JSON.stringify(model));
    return model;
}

function saveModel(context, model) {
    log("Saving model: " + JSON.stringify(model));
    context.attributes['model'] = model;
}

function getNextPersonName(model) {
    log("Getting next person");
    var nextPerson = model.people[model.nextPersonIndex];
    log("Next person is: " + nextPerson);
    return nextPerson;
}

function updateNextPerson(model) {
    log("Updating next person");
    var currentPersonIndex = model.people.findIndex((x) => x.id == model.nextPersonIndex);
    log("Current person index is: " + model.nextPersonIndex);
    var nextPersonIndex = model.nextPersonIndex + 1;
    if (nextPersonIndex >= model.people.length) {
        nextPersonIndex = 0;
    }
    log("Next person index is: " + nextPersonIndex);

    model.nextPersonIndex = nextPersonIndex;
}

module.exports = {
    'Unhandled': function() {
        this.emit(':tell', 'This is an unhandled intent');
    },

    'NextPersonIntent': function() {
        log("Next person intent");
        model = getModel(this);
        if (model.people.length == 0) {
            respond(this, "There isn't anyone on the cookie rota yet");
        } else {
            respond(this, "The next person to buy cookies is " + getNextPersonName(model));
        }
    },

    'AddPersonIntent': function() {
        log("Add person intent");

        var name = this.event.request.intent.slots.name.value;
        log ("Name to add is: " + name);

        var model = getModel(this);
        model.people.push(name);
        log("Updated model is: " + JSON.stringify(model));

        saveModel(this, model);
        respond(this, "Ok, I've added " + name + " to the cookie rota");
    },

    'ListPeopleIntent': function() {
        //TODO: Cope with no people
        log("List people intent");

        var model = getModel(this);
        var numberOfPeople = model.people.length;
        var people = model.people;

        var listOfPeople = people[0];
        var peopleCountResponse = "";
        if (numberOfPeople > 2) {
            for (i = 1; i < numberOfPeople - 1; i++) {
                listOfPeople = listOfPeople + ", " + model.people[i];
            }
        }
        if (numberOfPeople > 1) {
            listOfPeople = listOfPeople + " and " + people[numberOfPeople - 1];
            peopleCountResponse = "There are " + numberOfPeople + " people. ";
        } else {
            peopleCountResponse = "There is " + numberOfPeople + " person. ";
        }

        log("List of people is: " + listOfPeople);
        respond(this, peopleCountResponse + listOfPeople);
    },

    'MoveNextIntent': function() {
        //TODO: Cope with no people on rota

        var model = getModel(this);
        updateNextPerson(model);
        saveModel(this, model);
        respond(this, "Ok. Now the next person to buy cookies is " + getNextPersonName(model));
    },

    'ResetIntent': function() {
        var model = {
            nextPersonIndex: 0,
            people: ["Adam", "Ash", "Nick", "Jon", "Alastair"]
        };
        saveModel(this, model);
        respond(this, "Ok, I've reset the rota.");
    }
}