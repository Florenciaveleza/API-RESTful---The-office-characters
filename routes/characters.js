import express from 'express'
import verifyToken from '../middlewares/auth.js';
import {charactersList, findCharacter, showQuotes, findByName, findByQuote, createCharacter, updateQuotes, deleteCharacter, filterFirstEpisode, filterGender, sortByEpisode, limitCharacters} from '../controllers/characters_controllers.js'

const route = express.Router();

//get: búsquedas

//Búsqueda de todos los personajes
route.get('/', verifyToken, (req, res) => {
    let result = charactersList();
    result.then(characters => {
        res.json(characters);
    }).catch(err => {
        res.status(400).json(err);
    })
});

//Mostramos unicamente los nombres de los personajes con sus frases.
route.get('/quotes', verifyToken, (req, res) => {
    let result = showQuotes();
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
});

//Ordenar 
route.get('/sort-by-episode', verifyToken, (req, res) => {
    let result = sortByEpisode();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
})

//Paginado
route.get('/limit-characters', verifyToken, (req, res) => {
    let result = limitCharacters();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
});

//Búsqueda por id
route.get('/:id', verifyToken, (req, res) => {
    let result = findCharacter(req.params.id);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
});

//Búsqueda por nombre
route.get('/name/:name', verifyToken, (req, res) => {
    let result = findByName(req.params.name);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
});

//Buscamos por frase
//Averiguamos que personaje dijo la frase buscada.
route.get('/quote/:quotes', verifyToken, (req, res) => {
    let result = findByQuote(req.params.quotes);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err})
    })
});

//Agregar un nuevo personaje
route.post('/', verifyToken, (req, res) => {
    let result = createCharacter(req);
    result.then(character => {
        res.json({
            character
        })
    }).catch(err => {
        res.status(400).json(err);
    })
});

//Modificar las frases de los personajes.
route.put('/:id', verifyToken, (req, res) => {
    let result = updateQuotes(req.body, req.params.id);
    result.then(value => {
        res.json({
            value
        })
    }).catch(err => {
        res.status(400).json(err)
    })
});


//Eliminar un personaje
route.delete('/:id', verifyToken, (req, res) => {
    let result = deleteCharacter(req.params.id);
    result.then(value => {
        res.json({
            value
        })
    }).catch(err => {
        res.status(400).json(err)
    })
});

//Filtros
//Filtro por episodio de aparición.
route.get('/episodes/:first', verifyToken, (req, res) => {
    let result = filterFirstEpisode(req.params.first);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
});

//Filtro por género
route.get('/gender/:gender',verifyToken, (req, res) => {
    let result = filterGender(req.params.gender);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json(err)
    })
});


export default route;