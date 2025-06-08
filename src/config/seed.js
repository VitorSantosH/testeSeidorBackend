const { addVehicle } = require('../repositories/vehicleRepo');
const { addDriver } = require('../repositories/driverRepo');

const seedData = () => {
  // 10 veículos
  const vehicles = [
    { plate: 'AAA-1111', color: 'Preto', brand: 'Fiat' },
    { plate: 'BBB-2222', color: 'Prata', brand: 'Ford' },
    { plate: 'CCC-3333', color: 'Azul', brand: 'Chevrolet' },
    { plate: 'DDD-4444', color: 'Branco', brand: 'Toyota' },
    { plate: 'EEE-5555', color: 'Vermelho', brand: 'Volkswagen' },
    { plate: 'FFF-6666', color: 'Verde', brand: 'Renault' },
    { plate: 'GGG-7777', color: 'Cinza', brand: 'Hyundai' },
    { plate: 'HHH-8888', color: 'Preto', brand: 'Nissan' },
    { plate: 'III-9999', color: 'Branco', brand: 'Peugeot' },
    { plate: 'JJJ-0000', color: 'Azul', brand: 'Honda' }
  ];

  // 5 motoristas
  const drivers = [
    { name: 'Alice' },
    { name: 'Bruno' },
    { name: 'Carlos' },
    { name: 'Daniela' },
    { name: 'Eduardo' }
  ];

  vehicles.forEach(addVehicle);
  drivers.forEach(addDriver);
};

module.exports = seedData;
