import express from 'express'
import verifyToken from '../middlewares/auth.js';
import {charactersList, findCharacter, showQuotes, findByName, findByQuote, createCharacter, updateQuotes, deleteCharacter, filterFirstEpisode, filterGender, sortByEpisode, limitCharacters} from '../controllers/characters_controllers.js'

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken

//get
//Búsqueda de todos los personajes
route.get('/', verifyToken, (req, res) => {
    let result = charactersList();
    result.then(characters => {
        res.json(characters);
    }).catch(err => {
        res.status(400).json({err, message: "Hubo un problema al intentar obtener la lista de personajes." });
    })
});

//Mostramos unicamente los nombres de los personajes con sus frases.
route.get('/quotes', verifyToken, (req, res) => {
    let result = showQuotes();
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err, message: "Se ha producido un error al intentar obtener los nombres de los personajes con sus frases."})
    })
});

//Ordenar 
//Primero se muestran los personajes que aparecen en el episodio piloto.
route.get('/sort-by-episode', verifyToken, (req, res) => {
    let result = sortByEpisode();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err, message: "Se ha producido un error al intentar ordenar personajes."})
    })
})

//Paginado
//Limitamos la cantidad de documentos a devolver en una query
//También en la query incluimos la página actual
//http://localhost:3000/characters/limit-characters?page=num&limit=num
route.get('/limit-characters', verifyToken, (req, res) => {
    let result = limitCharacters(req.query.page , req.query.limit);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err, message: "La solicitud de paginación y límite de resultados es incorrecta. Asegúrate de incluir los parámetros 'page' y 'limit' en la consulta y proporcionar valores válidos."})
    })
});

//Búsqueda por id
route.get('/:id', verifyToken, (req, res) => {
    let result = findCharacter(req.params.id);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err, message: "No se encontró el personaje solicitado"})
    })
});

//Búsqueda por nombre
route.get('/name/:name', verifyToken, (req, res) => {
    let result = findByName(req.params.name);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err, message: "No se encontró el personaje solicitado"})
    })
});

//Buscamos por frase
//Averiguamos que personaje dijo la frase buscada.
route.get('/quote/:quotes', verifyToken, (req, res) => {
    let result = findByQuote(req.params.quotes);
    result.then(value => {
        res.json(value);
    }).catch(err => {
        res.status(400).json({err, message: "No se encontró el personaje solicitado"})
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
        res.status(400).json({err, message: "Se ha producido un error al intentar crear un nuevo personaje. Por favor, verificá los datos proporcionados."});
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
        res.status(400).json({err, message: "Se ha producido un error al intentar modificar las frases de los personajes. Por favor, verificá los datos proporcionados."})
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
        res.status(400).json({err, message: "El usuario solicitado no existe"})
    })
});

//Filtros
//Filtro por episodio de aparición.
route.get('/episodes/:first', verifyToken, (req, res) => {
    let result = filterFirstEpisode(req.params.first);
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err})
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