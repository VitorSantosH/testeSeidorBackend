const express = require('express');
const router = express.Router();
const repo = require('../repositories/vehicleRepo');

router.post('/', (req, res) => res.json(repo.addVehicle(req.body)));
router.put('/:id', (req, res) => res.json(repo.updateVehicle(req.params.id, req.body)));
router.delete('/:id', (req, res) => { repo.deleteVehicle(req.params.id); res.sendStatus(204); });
router.get('/:id', (req, res) => {

    var vehicle = repo.getVehicleById(req.params.id);
    console.log(vehicle);
    return res.json(vehicle);
}
);
router.get('/', (req, res) => res.json(repo.listVehicles(req.query)));

module.exports = router;
