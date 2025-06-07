const { getDriverById, isDriverUsingVehicle } = require('../repositories/driverRepo');
const { getVehicleById, isVehicleInUse } = require('../repositories/vehicleRepo');

const usages = [];

const startUsage = (vehicleId, driverId, reason) => {
  if (isVehicleInUse(vehicleId)) throw new Error('Veículo em uso');
  if (isDriverUsingVehicle(driverId)) throw new Error('Motorista já está usando outro veículo');

  const usage = {
    id: usages.length + 1,
    vehicleId,
    driverId,
    reason,
    startDate: new Date(),
    endDate: null,
  };

  usages.push(usage);
  return usage;
  
};

const getUsages = () => usages;

module.exports = {
  startUsage,
  getUsages
};
