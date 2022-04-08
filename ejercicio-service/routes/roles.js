var express = require('express');
var router = express.Router();

const listRoles =[
  {
      id: 1,
      name: "Administrativo",
      description: "Rol del personal administrativo"
  },
  {
      id: 2,
      name: "TI",
      description: "Rol del personal de tecnología"
  },
  {
      id: 3,
      name: "Soporte",
      description: "Rol del personal dedicado a soporte"
  }
]

router.get('/', function (req, res, next) {
  let jsonResponse = listRoles;
  res.json(jsonResponse);
});

router.get('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  const role = listRoles.find(x => x.id === id);

  if (!role) {
    return res.status(404).send('Rol no encontrado')
  }

  res.json(role);

});

router.post('/', function (req, res, next) {
  const newrole = {
    id: listRoles.length + 1,
    name: req.body.name,
    description: req.body.description
  }

  listRoles.push(newrole);

  res.json(newrole);
})

router.put('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  const index = listRoles.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(404).send('Rol no encontrado')
  }

  const roleEdit = {
    id: listRoles[index].id,
    name: req.body.name,
    description: req.body.description
  }

  listRoles[index] = roleEdit;
  res.json(roleEdit);
})

router.delete('/:id', function (req, res, next) {
  const id = Number(req.params.id);
  const index = listRoles.findIndex(x => x.id === id);

  if (index === -1) {
    return res.status(404).send('Rol no encontrado')
  }

  listRoles.splice(index, 1);
  res.json(true);
})

module.exports = router;
