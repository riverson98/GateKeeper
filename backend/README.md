# 🚪 GateKeeper

Sistema de gerenciamento de portaria para condomínios, desenvolvido para controlar residentes e códigos de entrega de produtos.

## 📋 Descrição

O **GateKeeper** é uma aplicação backend desenvolvida em NestJS que oferece uma solução para gerenciar:

- **Residentes**: Cadastro de moradores com informações de contato e unidade
- **Códigos de Entrega**: Controle de códigos de entrega de diferentes provedores (iFood, Mercado Livre, etc.)

O projeto segue os princípios de **Clean Architecture** e **DDD (Domain-Driven Design)**, garantindo separação de responsabilidades e manutenibilidade do código.

## 🛠️ Tecnologias

- **Node.js** com **TypeScript**
- **NestJS** - Framework Node.js progressivo
- **Prisma** - ORM moderno para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Docker Compose** - Orquestração do banco de dados

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para o banco de dados)

## 🚀 Instalação

1. **Clone o repositório** (se ainda não o fez):
   ```bash
   git clone <url-do-repositorio>
   cd GateKeeper/backend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   
   Crie um arquivo `.env` na raiz do diretório `backend` com o seguinte conteúdo:
   ```env
   DATABASE_URL="postgresql://postgres:1234@localhost:5433/gatekeeperdb?schema=public"
   PORT=3000
   ```

## 🗄️ Configuração do Banco de Dados

O projeto utiliza Docker Compose para facilitar a configuração do banco de dados PostgreSQL.

1. **Inicie o banco de dados**:
   ```bash
   docker-compose up -d
   ```

   Isso irá criar um container PostgreSQL na porta `5433` com as seguintes credenciais:
   - **Usuário**: `postgres`
   - **Senha**: `1234`
   - **Database**: `gatekeeperdb`

2. **Execute as migrações**:
   ```bash
   npx prisma migrate dev
   ```

   Ou para gerar o cliente Prisma e aplicar migrações:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

## 🌱 Popular o Banco de Dados (Seed)

O projeto inclui um script de seed para popular a base de dados com dados iniciais de exemplo.

### Executando o Seed

Para executar o script de seed, você pode usar um dos seguintes comandos:

```bash
# Usando o comando Prisma diretamente
npx prisma db seed

# Ou usando ts-node diretamente
npx ts-node prisma/seed.ts
```

### O que o Seed faz?

O script de seed (`prisma/seed.ts`) realiza as seguintes operações:

1. **Limpa dados existentes**: Remove todos os registros de `deliveryCodes` e `residents`
2. **Cria residentes de exemplo**:
   - **Residente 1**: 
     - Nome: River
     - Telefone: 47999998888
     - Unidade: 101 - Bloco A
     - Códigos de entrega: ABCD (IFOOD) e 1234 (MERCADO_LIVRE)
   - **Residente 2**:
     - Nome: Costa
     - Telefone: 11988887777
     - Unidade: 205 - Torre B

### Configuração do Seed no package.json

O seed está configurado no `package.json`:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Isso permite que o Prisma execute automaticamente o seed quando necessário.

## 🏃 Executando a Aplicação

### Modo de Desenvolvimento

```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000` (ou na porta configurada na variável `PORT`).

### Modo de Produção

1. **Compile o projeto**:
   ```bash
   npm run build
   ```

2. **Execute em modo de produção**:
   ```bash
   npm run start:prod
   ```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start              # Inicia a aplicação
npm run start:dev          # Inicia em modo watch (desenvolvimento)
npm run start:debug        # Inicia em modo debug

# Build
npm run build              # Compila o projeto TypeScript

# Testes
npm run test               # Executa testes unitários
npm run test:watch         # Executa testes em modo watch
npm run test:cov           # Executa testes com cobertura
npm run test:e2e           # Executa testes end-to-end

# Qualidade de Código
npm run lint               # Executa o linter
npm run format             # Formata o código com Prettier

# Prisma
npx prisma studio          # Abre o Prisma Studio (interface visual do banco)
npx prisma generate        # Gera o cliente Prisma
npx prisma migrate dev     # Cria e aplica uma nova migração
npx prisma migrate deploy  # Aplica migrações pendentes
npx prisma db seed         # Executa o script de seed
```

## 📁 Estrutura do Projeto

```
backend/
├── prisma/
│   ├── migrations/          # Migrações do banco de dados
│   ├── schema.prisma        # Schema do Prisma
│   └── seed.ts              # Script de seed (popular banco)
├── src/
│   ├── modules/
│   │   └── resident/        # Módulo de residentes
│   │       ├── application/ # Use cases e DTOs
│   │       ├── domain/      # Entidades e Value Objects
│   │       └── infrastructure/ # Controllers e repositórios
│   ├── shared/              # Módulos compartilhados
│   ├── app.module.ts        # Módulo raiz
│   └── main.ts              # Arquivo de entrada
├── test/                    # Testes end-to-end
├── docker-compose.yml       # Configuração Docker Compose
└── package.json
```

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** e **DDD**, com as seguintes camadas:

- **Domain**: Entidades e Value Objects com regras de negócio puras
- **Application**: Use cases que orquestram a lógica de negócio
- **Infrastructure**: Implementações concretas (repositórios, controllers)

Para mais detalhes sobre a arquitetura, consulte o arquivo [ARCHITECTURE.md](./ARCHITECTURE.md).

## 📊 Modelo de Dados

### Resident (Residente)
- `id`: UUID (identificador único)
- `name`: Nome do residente
- `phone`: Telefone de contato
- `unitNumber`: Número da unidade
- `unitComplement`: Complemento da unidade (ex: Bloco A, Torre B)
- `deliveryCodes`: Códigos de entrega associados
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização
- `deletedAt`: Data de exclusão (soft delete)

### DeliveryCode (Código de Entrega)
- `id`: UUID (identificador único)
- `code`: Código de entrega
- `provider`: Provedor (ex: IFOOD, MERCADO_LIVRE)
- `residentId`: Referência ao residente

## 🔍 Prisma Studio

Para visualizar e editar os dados do banco de forma visual:

```bash
npx prisma studio
```

Isso abrirá uma interface web em `http://localhost:5555` onde você pode visualizar e gerenciar os dados.

## 📝 Exemplos de Uso

### Criar um Residente

```typescript
POST /residents
{
  "name": "João Silva",
  "phone": "11999999999",
  "unitNumber": "301",
  "unitComplement": "Torre C",
  "deliveryCodes": [
    {
      "code": "XYZ123",
      "provider": "IFOOD"
    }
  ]
}
```

### Listar Residentes

```typescript
GET /residents
```

### Buscar Residente por ID

```typescript
GET /residents/:id
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

## 📚 Recursos Úteis

- [Documentação NestJS](https://docs.nestjs.com)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Docker Compose](https://docs.docker.com/compose/)

---

Desenvolvido com ❤️ usando NestJS e TypeScript
