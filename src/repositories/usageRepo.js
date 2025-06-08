const usages = [];

const startUsage = (vehicleId, driverId, reason) => {
  if (isVehicleInUse(vehicleId)) throw new Error('Veículo em uso');
  if (isDriverUsingVehicle(driverId)) throw new Error('Motorista já está usando um veículo');

  const usage = {
    id: usages.length + 1,
    vehicleId,
    driverId,
    reason,
    startDate: new Date(),
    endDate: null
  };

  usages.push(usage);
  return usage;
};

const finishUsage = (id) => {
  const usage = usages.find(u => u.id === parseInt(id));
  if (usage && !usage.endDate) {
    usage.endDate = new Date();
    return usage;
  }
  throw new Error('Uso não encontrado ou já finalizado');
};

const listUsages = () => usages;

const isVehicleInUse = (vehicleId) =>
  usages.some(u => u.vehicleId == vehicleId && !u.endDate);

const isDriverUsingVehicle = (driverId) =>
  usages.some(u => u.driverId == driverId && !u.endDate);

module.exports = { startUsage, finishUsage, listUsages, isVehicleInUse, isDriverUsingVehicle };
