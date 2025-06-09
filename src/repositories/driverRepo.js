const drivers = []; // armazenamento em memória

const getDriverById = (id) => {
    return drivers.find(driver => driver.id == id);
};

const getDriverByName = (name) => {
    return drivers.find(driver => driver.name.toLowerCase() == name.toLowerCase());
};

const isDriverUsingVehicle = (driverId) => {
    const usage = require('../services/usageService').getUsages();
    return usage.some(u => u.driverId == driverId && !u.endDate);
};

const addDriver = (driver) => {
    driver.id = drivers.length + 1;
    drivers.push(driver);
    return driver;
};

const updateDriver = (id, data) => {
    const driver = drivers.find(d => d.id == parseInt(id));
    if (driver) Object.assign(driver, data);
    return driver;
};

const deleteDriver = (id) => {
    const index = drivers.findIndex(d => d.id == parseInt(id));
    if (index !== -1) drivers.splice(index, 1);
};

const listDrivers = (filters = {}) => {
    return drivers.filter(d => !filters.name || d.name.toLowerCase().includes(filters.name.toLowerCase()));
};



module.exports = {
    getDriverById,
    isDriverUsingVehicle,
    addDriver,
    addDriver,
    updateDriver,
    deleteDriver,
    getDriverById,
    listDrivers,
    getDriverByName

};
