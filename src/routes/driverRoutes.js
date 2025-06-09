const express = require('express');
const router = express.Router();
const repo = require('../repositories/driverRepo');

router.post('/', (req, res) => res.json(repo.addDriver(req.body)));
router.put('/:id', (req, res) => res.json(repo.updateDriver(req.params.id, req.body)));
router.delete('/:id', (req, res) => { repo.deleteDriver(req.params.id); res.sendStatus(204); });
router.get('/:id', (req, res) => res.json(repo.getDriverById(req.params.id)));
router.get('/name/:name', (req, res) =>  {
    const driver = repo.getDriverByName(req.params.name);
    if (driver) {
        res.json(driver);
    } else {
        res.status(404).send('Motorista não encontrado');
    }
});
router.get('/', (req, res) => res.json(repo.listDrivers(req.query)));

module.exports = router;
