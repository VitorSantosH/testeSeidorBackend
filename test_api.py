import requests

BASE_URL = 'http://localhost:3000'

def log(title, data):
    print(f'\n=== {title} ===')
    print(data)

# ----------- Veículos -----------
def test_vehicles():
    res = requests.post(f'{BASE_URL}/vehicles', json={"plate": "AAA-0001", "color": "Preto", "brand": "Toyota"})
    vehicle = res.json()
    vehicle_id = vehicle["id"]
    log("Criar veículo", vehicle)

    res = requests.get(f'{BASE_URL}/vehicles/{vehicle_id}')
    log("Obter veículo por ID", res.json())

    res = requests.put(f'{BASE_URL}/vehicles/{vehicle_id}', json={"brand": "Honda"})
    log("Atualizar veículo", res.json())

    res = requests.get(f'{BASE_URL}/vehicles', params={"color": "Preto"})
    log("Listar veículos com filtro", res.json())

    res = requests.delete(f'{BASE_URL}/vehicles/{vehicle_id}')
    log("Excluir veículo", res.status_code)

# ----------- Motoristas -----------
def test_drivers():
    res = requests.post(f'{BASE_URL}/drivers', json={"name": "João Motorista"})
    driver = res.json()
    driver_id = driver["id"]
    log("Criar motorista", driver)

    res = requests.get(f'{BASE_URL}/drivers/{driver_id}')
    log("Obter motorista por ID", res.json())

    res = requests.put(f'{BASE_URL}/drivers/{driver_id}', json={"name": "João Atualizado"})
    log("Atualizar motorista", res.json())

    res = requests.get(f'{BASE_URL}/drivers', params={"name": "João"})
    log("Listar motoristas com filtro", res.json())

    res = requests.delete(f'{BASE_URL}/drivers/{driver_id}')
    log("Excluir motorista", res.status_code)

# ----------- Uso de veículos -----------
def test_usage():
    # Criar veículo e motorista para uso
    v = requests.post(f'{BASE_URL}/vehicles', json={"plate": "BBB-0002", "color": "Prata", "brand": "Ford"}).json()
    d = requests.post(f'{BASE_URL}/drivers', json={"name": "Maria Motorista"}).json()

    vehicle_id = v["id"]
    driver_id = d["id"]

    # Criar utilização
    res = requests.post(f'{BASE_URL}/usages', json={
        "vehicleId": vehicle_id,
        "driverId": driver_id,
        "reason": "Entrega de documentos"
    })
    usage = res.json()
    log("Criar uso de veículo", usage)

    # Tentativa inválida: mesmo motorista com outro veículo
    another_vehicle = requests.post(f'{BASE_URL}/vehicles', json={"plate": "CCC-0003", "color": "Branco", "brand": "Fiat"}).json()
    res = requests.post(f'{BASE_URL}/usages', json={
        "vehicleId": another_vehicle["id"],
        "driverId": driver_id,
        "reason": "Teste conflito motorista"
    })
    log("Tentativa inválida de uso duplicado", res.json())

    # Finalizar uso
    usage_id = usage["id"]
    res = requests.patch(f'{BASE_URL}/usages/{usage_id}/finalizar')
    log("Finalizar uso de veículo", res.json())

    # Listar usos
    res = requests.get(f'{BASE_URL}/usages')
    log("Listar registros de uso", res.json())

# ----------- Execução -----------
if __name__ == "__main__":
    test_vehicles()
    test_drivers()
    test_usage()
