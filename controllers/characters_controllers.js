import Character from '../models/characters_models.js';

//Buscamos todos los personajes con el status true, por defecto todos tienen true, a menos que especifiquemos lo contrario.
async function charactersList() {
    let characters = await Character.find({'status': true})
    return characters;
}

async function findCharacter(id) {
    let character = await Character.find({_id: id});
    return character;
}

//Con esta función mostramos las frases y el nombre, especificando que no nos muestre el id
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


async function sortByEpisode() {
    let character = await Character.find().sort({first: -1})
    return character;
}

//Nos llega por parametro la página actual y la cantidad de personajes a limitar
//Con la constante skip calculamos la cantidad de elementos a omitir.
async function limitCharacters(page, limit) {
    const skip = (page - 1) * limit;
    let character = await Character.find().limit(limit).skip(skip);
    return character;
}

export {charactersList, findCharacter, showQuotes, findByName, findByQuote, createCharacter, updateQuotes, deleteCharacter, filterFirstEpisode, filterGender, sortByEpisode, limitCharacters};