# Projeto-Viglat

# VigLat - Sistema IoT para Monitoramento de Maturação de Queijo Minas Artesanal 🧀📊

## Visão Geral 👀
O **VigLat** é um sistema IoT de baixo custo para monitoramento de **temperatura** e **umidade relativa do ar (URA)** em câmaras de maturação de **Queijo Minas Padrão Artesanal (QMA)**. Desenvolvido com **Arduino**, **sensores DHT11** e um site web com **dashboard de gráficos**, ele coleta dados em tempo real, armazena em **MySQL** e envia **alertas** para variações críticas.

O projeto atende produtores artesanais de **Minas Gerais**, ajudando a **padronizar** o produto, **reduzir perdas** (até R$480.000/ano) e garantir **segurança alimentar**, monitorando parâmetros ideais: **16-20°C** e **75-85% URA** por **14-22 dias**.

## Funcionalidades ✨
- 🔄 **Coleta temporizada** de temperatura e URA via Arduino + DHT11
- 💾 **Armazenamento** de dados em MySQL (100% dos registros)
- 📈 **Dashboard web** com gráficos dinâmicos (JavaScript/HTML/CSS)
- 🔐 **Login seguro** para produtores
- 🚨 **Alertas automáticos** por desvios (notificações em tempo real)
- 📋 **Histórico de dados** e exportação de relatórios

## Tecnologias Utilizadas 🛠️
| Componentes | Tecnologias |
|------------|-------------|
| 💻 **Hardware** | Arduino, DHT11, Protoboard, Cabos Jumper |
| 🗄️ **Backend** | MySQL (banco de dados), Arduino IDE |
| 🎨 **Frontend** | HTML, CSS, JavaScript (gráficos e dashboard) |
| ⚙️ **Ferramentas** | VS Code, GitHub, Trello, MySQL Workbench |

## Pré-requisitos ✅
- Arduino Uno ou similar
- Sensor DHT11
- Computador com internet para hospedagem do site
- MySQL instalado
- Energia elétrica e WiFi na câmara de maturação

## Instalação 🚀

1. Clone o repositório: git clone https://github.com/estevamgs/Projeto-Viglat
2. Instale dependências do Arduino via Arduino IDE
3. Configure o MySQL
4. Hospede o site e aponte para o banco
5. Conecte Arduino ao DHT11
6. Teste envio de dados via API


## Uso 🎮
1. **Login** no site com credenciais de produtor
2. Visualize **dashboard** com gráficos **temperatura/URA** de 10 em 10 minutos
3. Configure **alertas** para limites (ex: <16°C ou >85% URA)
4. Acesse **histórico** e baixe relatórios **PDF**

## Limitações ⚠️
- Monitora **apenas temperatura e URA** na maturação
- **Sem automação corretiva** (ajustes manuais)
- Baixo custo, **sem criptografia avançada** no login

*"Tradição também pode ser tech!"* 🌟
