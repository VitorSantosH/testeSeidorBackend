const vehicles = []; // armazenamento em memória

const getVehicleById = (id) => {
    console.log(vehicles)
    console.log(id)
    return vehicles.find(vehicle => vehicle.id == id);
};

const getVehicleByColor = (color) => {
    console.log(vehicles)
    console.log(color)
    return vehicles.filter(vehicle => vehicle.color.toLowerCase() == color.toLowerCase());
};

const getVehicleBybrand = (brand) => {
    console.log(vehicles)
    console.log(brand)
    return vehicles.filter(vehicle => vehicle.brand.toLowerCase() == brand.toLowerCase());
};

const pesquisa = (query) => {
    const q = query.toLowerCase();
    return vehicles.filter(v =>
        v.plate.toLowerCase().includes(q) ||
        v.color.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q)
    );
};

const isVehicleInUse = (vehicleId) => {
    const usage = require('../services/usageService').getUsages();
    return usage.some(u => u.vehicleId == vehicleId && !u.endDate);
};

const addVehicle = (vehicle) => {
    vehicle.id = vehicles.length + 1;
    vehicles.push(vehicle);
    return vehicle;
};

const updateVehicle = (id, data) => {
    console.log(data)
    const vehicle = vehicles.find(v => v.id == parseInt(id));
    if (vehicle) Object.assign(vehicle, data);
    return vehicle;
};

const deleteVehicle = (id) => {
    const index = vehicles.findIndex(v => v.id == parseInt(id));
    if (index !== -1) vehicles.splice(index, 1);
};


const listVehicles = (filters = {}) => {
    return vehicles.filter(v => {
        return (!filters.color || v.color == filters.color) &&
            (!filters.brand || v.brand == filters.brand);
    });
};



module.exports = {
    getVehicleById,
    isVehicleInUse,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getVehicleById,
    listVehicles,
    getVehicleByColor,
    getVehicleBybrand,
    pesquisa
};
