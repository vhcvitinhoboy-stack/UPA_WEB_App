# Instruções para Agentes de IA - UPA_WEB

Este documento fornece orientações essenciais para agentes de IA trabalhando neste projeto.

## Requisitos do Ambiente

### Dependências Principais
- Python 3.x
- Flask
- Flask-CORS

### Configuração Inicial
```bash
# Instalar dependências
pip install flask flask-cors

# Verificar instalação
python -c "import flask; import flask_cors; print('Dependências instaladas com sucesso!')"
```

## Visão Geral da Arquitetura

Este é um projeto web com uma arquitetura cliente-servidor:

- **Backend**: Aplicação Flask (Python) que serve uma API RESTful
- **Frontend**: (Detalhes a serem confirmados)

### Componentes Principais

#### Backend (`/backend`)
- API Flask com CORS habilitado para todas as rotas
- Dados armazenados em arquivo JSON local (`data.json`)
- Endpoints principais:
  - `GET /api/locations` - Retorna lista de localizações
  - `GET /` - Healthcheck da API

### Padrões e Convenções

1. **Gerenciamento de Dados**
   - Os dados são armazenados em `data.json` no diretório raiz do backend
   - Função `load_locations_data()` gerencia a leitura do arquivo

2. **Configuração**
   - Variáveis de ambiente suportadas:
     - `PORT`: Porta do servidor (padrão: 5000)

3. **Desenvolvimento**
   - O servidor roda em modo debug por padrão
   - CORS está habilitado globalmente para facilitar o desenvolvimento

### Fluxos de Desenvolvimento Comuns

1. **Executando o Backend**
   ```bash
   # Navegue até o diretório do backend
   cd backend
   
   # Verifique se o ambiente está correto
   python --version  # Deve mostrar Python 3.x
   
   # Inicie o servidor
   python app.py
   ```
   Servidor estará disponível em `http://localhost:5000`
   
   Para desenvolvimento, você pode usar:
   ```bash
   # Recarregamento automático ao alterar código
   FLASK_ENV=development python app.py
   
   # Ou usar uma porta específica
   PORT=5001 python app.py
   ```

2. **Testando a API**
   - Verifique o status: `GET http://localhost:5000/`
   - Liste localizações: `GET http://localhost:5000/api/locations`

3. **Estrutura de Arquivos**
   ```
   backend/
   ├── app.py         # Aplicação principal Flask
   ├── data.json      # Arquivo de dados
   └── .github/       # Documentação e configurações do GitHub
   ```

### Solução de Problemas Comuns

1. **Erro ao iniciar o servidor**
   - Verifique se o arquivo `data.json` existe no diretório do backend:
     ```bash
     # Criar data.json se não existir
     cd backend
     echo '[]' > data.json
     ```
   - Confirme que todas as dependências estão instaladas:
     ```bash
     pip install -U flask flask-cors
     ```
   - Verifique se a porta 5000 não está em uso:
     ```bash
     # Linux/macOS
     lsof -i :5000
     # ou use uma porta diferente
     export PORT=5001
     ```
   - Verifique permissões do diretório:
     ```bash
     chmod 644 data.json
     chmod 755 app.py
     ```

2. **CORS e Acesso à API**
   - O CORS está configurado para permitir acesso de qualquer origem
   - Se houver problemas de CORS, verifique:
     - Headers da requisição
     - Se o frontend está acessando a URL correta
     - Se o servidor Flask está rodando no host correto (0.0.0.0)

3. **Problemas com data.json**
   - Certifique-se que o arquivo existe e é válido:
     ```bash
     python -c "import json; json.load(open('data.json'))"
     ```
   - O arquivo deve conter uma lista válida de JSON

---

## Áreas que Precisam de Esclarecimento

1. **Frontend**
   - Tecnologias utilizadas
   - Estrutura e organização
   - Padrões de comunicação com o backend

2. **Dados**
   - Estrutura específica do arquivo data.json
   - Processo de atualização dos dados
   - Backup e versionamento

3. **Deploy**
   - Ambiente de produção
   - Processo de deploy
   - Configurações específicas por ambiente

Por favor, forneça feedback sobre estas áreas para melhorar as instruções.