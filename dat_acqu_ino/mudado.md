# Mudanças no arquivo index.html

# 1. **IDs dos Canvases**

- `index.html`: `id="temp"` e `id="umi"`
- `HtmlOriginal`: `id="sensorAnalogico"` e `id="sensorDigital"`

# 2. **Labels dos Datasets**

- `index.html`: `"Temperatura"` e `"Umidade"`
- `HtmlOriginal`: `"Analogico"` e `"Digital"`

# 3. **Unidades do Eixo Y**

- `index.html`: `"(°C)"` para temp e `"(%)"` para umi
- `HtmlOriginal`: `"(%)"` para sensorAnalogico e `"(0-1)"` para sensorDigital

# 4. **Configurações dos Eixos X**

- `index.html`: x só em temp com `beginAtZero: true`
- `HtmlOriginal`: x em ambos os gráficos com `beginAtZero: true`

# 5. **Endpoints da API (fetch)**

- `index.html`: `"temperatura"` e `"umidade"`
- `HtmlOriginal`: `"analogico"` e `"digital"`

# Mudanças no arquivo main.js (comparado a JsOriginal)

# 1. **HABILITAR_OPERACAO_INSERIR**

- `JsOriginal`: `false`
- `main.js`: `true`

# 2. **Configuração do Banco de Dados**

- `JsOriginal`: Placeholders `'HOST_DO_BANCO'`, `'USUARIO_DO_BANCO'`, etc., database `'DATABASE_DO_BANCO'`
- `main.js`: Reais `"localhost"`, `"API"`, `"TesteApi1@"`, `"PROJETOPI"`

# 3. **Parsing dos Dados Serial (split(';'))**

- `JsOriginal`: `sensorDigital = parseInt(valores[0])`, `sensorAnalogico = parseFloat(valores[1])`
- `main.js`: `umidade = parseInt(valores[0])`, `temperatura = parseFloat(valores[1])`

# 4. **Arrays de Armazenamento**

- `JsOriginal`: `valoresSensorAnalogico`, `valoresSensorDigital`
- `main.js`: `temp`, `umi`

# 5. **Inserts no Banco**

- `JsOriginal`: Um único INSERT em `medida (sensor_analogico, sensor_digital)`
- `main.js`: INSERTs em duas tabelas diferentes: `temperatura (temperatura)` e `umidade (umidade)`

# 6. **Endpoints da API (GET /sensores/)**

- `JsOriginal`: `/analogico`, `/digital`
- `main.js`: `/temperatura`, `/umidade`
