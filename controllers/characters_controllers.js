import Character from '../models/characters_models.js';

//Funciones

async function charactersList() {
    let characters = await Character.find({'status': true})
    return characters;
}

async function findCharacter(id) {
    let character = await Character.find({_id: id});
    return character;
}


async function showQuotes() {
    let characters = await Character.find({},{'quotes': 1, 'name': 1, _id: 0})
    return characters;
}

async function findByName(name) {
    let character = await Character.find({'name': name});
    return character;
}

async function findByQuote(quote) {
    let character = await Character.find({'quotes': quote});
    return character;
}

async function createCharacter(req) {
    let character = new Character({
        name: req.body.name,
        occupation: req.body.occupation,
        first: req.body.first,
        last: req.body.last,
        quotes: req.body.quotes
    });
    return await character.save();
}

async function updateQuotes(body, id) {
   let character = await Character.updateOne({ _id: id},
    {
        $set: {
            "quotes": body.quotes,
        }
    })
    return character;
}

async function deleteCharacter(id) {
    let character = await Character.deleteOne({_id: id});
    return character;
}

async function  filterFirstEpisode(first) {
    let character = await Character.find({'first': first});
    return character;
}

async function filterGender(gender) {
    let character = await Character.find({'gender':gender});
    return character;
}

//Primero se muestran los personajes que aparecen en el episodio piloto.
async function sortByEpisode() {
    let character = await Character.find().sort({first: -1})
    return character;
}

async function limitCharacters() {
    let character = await Character.find().limit(3);
    return character;
}

export {charactersList, findCharacter, showQuotes, findByName, findByQuote, createCharacter, updateQuotes, deleteCharacter, filterFirstEpisode, filterGender, sortByEpisode, limitCharacters};