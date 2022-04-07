var express = require('express');
var router = express.Router();

const listUsers = [
  {
    id: 1,
    name: "Evelyn Tatiana Auzay Jurado",
    identification: "1722267067",
    city: "Quito",
    idRole: 1
  },
  {
    id: 2,
    name: "Andres Benavides",
    identification: "1714785145",
    city: "Latacunga",
    idRole: 2
  },
  {
    id: 3,
    name: "Maria Fiallos",
    identification: "1712457896",
    city: "Cuenca",
    idRole: 1
  }
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  let jsonResponse = listUsers;
  res.json(jsonResponse);
});

router.get('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  console.log("idestado:" + id);
  const user = listUsers.find(x => x.id === id);
  console.log(listUsers);

  if (!user) {
    return res.status(404).send('Usuario no encontrado')
  }

  res.json(user);

});

router.post('/', function (req, res, next) {
  const newUser = {
    id: listUsers.length + 1,
    name: req.body.name,
    identification: req.body.identification,
    city: req.body.city,
    idRole: Number(req.body.idRole)
  }
  console.log(newUser);
  listUsers.push(newUser);

  res.json(newUser);
})

router.put('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  const index = listUsers.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(404).send('Usuario no encontrado')
  }

  const userEdit = {
    id: listUsers[index].id,
    name: req.body.name,
    identification: req.body.identification,
    city: req.body.city,
    idRole: req.body.idRole
  }

  listUsers[index] = userEdit;
  res.json(userEdit);
})

router.delete('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  const index = listUsers.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(404).send('Usuario no encontrado')
  }

  listUsers.splice(index, 1);
  res.json(true);
})

module.exports = router;
