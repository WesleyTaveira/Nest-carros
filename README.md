<div align="center">

# Nest Carros API

**REST API para gerenciamento de veículos e marcas automotivas**

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![License](https://img.shields.io/badge/License-UNLICENSED-red)](LICENSE)

</div>

---

## Visão Geral

A **Nest Carros API** é uma aplicação backend RESTful construída com [NestJS](https://nestjs.com) e [TypeORM](https://typeorm.io), voltada ao gerenciamento de um catálogo de veículos e suas marcas. O projeto foi desenvolvido seguindo princípios de **Clean Architecture**, com separação clara entre as camadas de domínio, aplicação, infraestrutura e apresentação.

A API oferece autenticação stateless via **JWT**, validação de dados em todas as entradas, documentação interativa via **Swagger**, proteção contra abuso com **rate limiting** e headers de segurança via **Helmet**.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Rodando o Projeto](#rodando-o-projeto)
  - [Modo Local (recomendado para desenvolvimento)](#modo-local-recomendado-para-desenvolvimento)
  - [Modo Docker Completo](#modo-docker-completo)
- [Documentação da API](#documentação-da-api)
  - [Autenticação](#autenticação)
  - [Usuários](#usuários)
  - [Marcas](#marcas)
  - [Carros](#carros)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelos de Dados](#modelos-de-dados)
- [Segurança](#segurança)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Solução de Problemas](#solução-de-problemas)

---

## Funcionalidades

- **CRUD completo** de Carros, Marcas e Usuários
- **Autenticação JWT** com expiração configurável
- **Hash de senhas** com bcrypt (salt de 10 rounds) automático via hook TypeORM
- **Validação de entrada** em todos os endpoints com `class-validator`
- **Rate limiting** global (30 requisições/minuto por IP)
- **Filtro global de exceções** com respostas padronizadas e logging de erros 5xx
- **Documentação interativa** Swagger/OpenAPI em `/api`
- **Headers de segurança HTTP** via Helmet
- **CORS** configurável via variável de ambiente
- **Suporte a Docker** com resolução automática de host para ambientes containerizados
- **Validação de variáveis de ambiente** na inicialização (falha rápida e mensagem clara)

---

## Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas com dependências unidirecionais (de fora para dentro):

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION                               │
│   Controllers · DTOs · Módulos NestJS · Swagger decorators      │
├─────────────────────────────────────────────────────────────────┤
│                      APPLICATION                                │
│   Use Cases (regras de negócio, orquestração de fluxos)         │
├─────────────────────────────────────────────────────────────────┤
│                        DOMAIN                                   │
│   Entidades de domínio · Interfaces de repositório (contratos)  │
├─────────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE                               │
│   TypeORM Entities · Repositories · DataSource (PostgreSQL)     │
└─────────────────────────────────────────────────────────────────┘
```

**Princípios aplicados:**

- **Inversão de dependência** — Use Cases dependem de interfaces (`ICarroRepository`), não de implementações concretas
- **Separação de responsabilidades** — Cada Use Case executa uma única operação de negócio
- **Domínio isolado** — A camada `domain/` não conhece NestJS, TypeORM ou qualquer framework externo
- **Fail Fast** — Variáveis de ambiente e configurações críticas são validadas na inicialização

---

## Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Runtime | Node.js | 22.x |
| Framework | NestJS | 11.x |
| Linguagem | TypeScript | 5.7 |
| ORM | TypeORM | 0.3.x |
| Banco de dados | PostgreSQL | 17 |
| Autenticação | Passport + JWT | — |
| Hash de senha | bcrypt | 6.x |
| Validação | class-validator + class-transformer | — |
| Documentação | @nestjs/swagger | 11.x |
| Segurança | Helmet | 8.x |
| Rate Limiting | @nestjs/throttler | 6.x |
| Containerização | Docker + Docker Compose | — |

---

## Pré-requisitos

Antes de começar, garanta que você tem instalado:

- **Node.js** >= 22.x — [download](https://nodejs.org)
- **npm** >= 10.x ou **yarn** >= 1.22.x
- **Docker** e **Docker Compose** — [download](https://www.docker.com/get-started) *(necessário para o banco de dados)*
- **Git** — [download](https://git-scm.com)

Verifique suas versões:

```bash
node -v     # v22.x.x
npm -v      # 10.x.x
docker -v   # Docker version 27.x.x
```

---

## Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/WesleyTaveira/nest-carros.git
cd nest-carros
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e ajuste os valores:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Banco de Dados
DB_HOST=db           # 'db' para Docker, '127.0.0.1' para local
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=nest_carros

# JWT — use um valor longo, aleatório e secreto em produção
JWT_SECRET=substitua_por_um_secret_forte_e_aleatorio

# Aplicação
PORT=3333

# Defina como "true" somente quando rodar dentro do Docker Compose
RUNNING_IN_DOCKER=false
```

> **Importante:** nunca comite o arquivo `.env` real. O `.gitignore` já o exclui por padrão.

---

## Rodando o Projeto

### Modo Local (recomendado para desenvolvimento)

Este modo sobe apenas o banco de dados via Docker e roda a aplicação direto na sua máquina, permitindo hot reload e fácil debug.

**Passo 1** — Certifique-se que o `.env` tem `RUNNING_IN_DOCKER=false` e `DB_HOST=db` (a aplicação resolve automaticamente para `127.0.0.1` fora do Docker).

**Passo 2** — Inicie o servidor de desenvolvimento:

```bash
npm run start:dev
```

Este comando faz três coisas em sequência:
1. Sobe o container do PostgreSQL (`docker compose up -d db`)
2. Aguarda a porta `5433` ficar disponível (`wait-on`)
3. Inicia o NestJS em modo watch com hot reload

A API estará disponível em: `http://localhost:3333`  
A documentação Swagger em: `http://localhost:3333/api`

---

### Modo Docker Completo

Roda tanto o banco quanto a aplicação dentro de containers. Ideal para simular o ambiente de produção.

**Passo 1** — Certifique-se que o `.env` tem `RUNNING_IN_DOCKER=true`.

**Passo 2** — Suba todos os serviços:

```bash
docker compose up --build
```

Para rodar em background:

```bash
docker compose up --build -d
```

Para parar e remover os containers:

```bash
docker compose down
```

Para parar e remover os containers **e os volumes** (apaga os dados do banco):

```bash
docker compose down -v
```

**Portas expostas:**

| Serviço | Porta interna | Porta no host |
|---------|:---:|:---:|
| API (app) | 3333 | 3333 |
| PostgreSQL (db) | 5432 | 5433 |

> A porta do PostgreSQL é mapeada para `5433` no host para evitar conflito com uma instalação local do Postgres na porta padrão `5432`.

---

## Documentação da API

Todos os endpoints (exceto `POST /auth/login`) exigem autenticação JWT.  
Inclua o token no header de cada requisição:

```
Authorization: Bearer <seu_token_jwt>
```

A documentação interativa completa está disponível em `http://localhost:3333/api` (Swagger UI).

---

### Autenticação

#### `POST /auth/login`

Autentica um usuário e retorna um token JWT válido por 24 horas.

**Body:**
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta de sucesso `200`:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

**Erros possíveis:**

| Status | Descrição |
|--------|-----------|
| `401` | E-mail ou senha incorretos |
| `429` | Muitas requisições (rate limit atingido) |

---

### Usuários

> Todos os endpoints requerem `Authorization: Bearer <token>`.

#### `POST /usuarios` — Cadastrar usuário

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta `201`:**
```json
{
  "statusCode": 201,
  "message": "Usuário salvo no banco.",
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

> A senha nunca é retornada nas respostas. O hash é gerado automaticamente antes de persistir no banco.

**Validações:**
- `email` deve ser um endereço de e-mail válido (case-insensitive)
- `senha` deve ter no mínimo 6 caracteres
- E-mails duplicados retornam `409 Conflict`

---

#### `GET /usuarios` — Listar todos os usuários

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "data": [
    { "id": 1, "nome": "João Silva", "email": "joao@email.com" }
  ]
}
```

---

#### `DELETE /usuarios/:id` — Deletar usuário

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "message": "Usuário deletado com sucesso."
}
```

| Status | Descrição |
|--------|-----------|
| `404` | Usuário não encontrado |

---

### Marcas

> Todos os endpoints requerem `Authorization: Bearer <token>`.

#### `POST /marcas` — Cadastrar marca

**Body:**
```json
{ "nome": "Toyota" }
```

**Resposta `201`:**
```json
{
  "statusCode": 201,
  "message": "Marca salva no banco.",
  "data": { "id": 1, "nome": "Toyota" }
}
```

---

#### `GET /marcas` — Listar todas as marcas

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "data": [
    { "id": 1, "nome": "Toyota" },
    { "id": 2, "nome": "Honda" }
  ]
}
```

---

#### `GET /marcas/:id` — Buscar marca por ID

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "data": { "id": 1, "nome": "Toyota" }
}
```

---

#### `PATCH /marcas/:id` — Atualizar marca

**Body** *(todos os campos são opcionais)*:
```json
{ "nome": "Toyota Motors" }
```

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "data": { "id": 1, "nome": "Toyota Motors" }
}
```

| Status | Descrição |
|--------|-----------|
| `404` | Marca não encontrada |
| `400` | Nome já está em uso por outra marca |

---

#### `DELETE /marcas/:id` — Deletar marca

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "message": "Marca deletada com sucesso."
}
```

---

### Carros

> Todos os endpoints requerem `Authorization: Bearer <token>`.

#### `POST /carros` — Cadastrar carro

**Body:**
```json
{
  "placa": "ABC-1234",
  "ano": 2020,
  "modelo": "Corolla",
  "marca": { "id": 1 }
}
```

**Resposta `201`:**
```json
{
  "statusCode": 201,
  "message": "Carro salvo no banco.",
  "data": {
    "id": 1,
    "placa": "ABC-1234",
    "ano": 2020,
    "modelo": "Corolla",
    "marca": { "id": 1, "nome": "Toyota" }
  }
}
```

**Validações:**
- `placa` obrigatória e única
- `ano` deve ser um inteiro entre `1900` e o ano atual
- `marca.id` deve referenciar uma marca existente
- Placa duplicada retorna `409 Conflict`
- Marca inexistente retorna `404 Not Found`

---

#### `GET /carros` — Listar todos os carros

Retorna todos os carros com os dados da marca associada (eager-loaded).

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": 1,
      "placa": "ABC-1234",
      "ano": 2020,
      "modelo": "Corolla",
      "marca": { "id": 1, "nome": "Toyota" }
    }
  ]
}
```

---

#### `GET /carros/:id` — Buscar carro por ID

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "placa": "ABC-1234",
    "ano": 2020,
    "modelo": "Corolla",
    "marca": { "id": 1, "nome": "Toyota" }
  }
}
```

---

#### `PATCH /carros/:id` — Atualizar carro

**Body** *(todos os campos são opcionais)*:
```json
{
  "placa": "XYZ-9999",
  "ano": 2021,
  "modelo": "Corolla Cross",
  "marca": { "id": 2 }
}
```

**Validações no update:**
- Ao alterar a `placa`, verifica duplicidade ignorando o próprio carro
- `ano`, `marca` e `placa` só são validados se presentes no body

---

#### `DELETE /carros/:id` — Deletar carro

**Resposta `200`:**
```json
{
  "statusCode": 200,
  "message": "Carro deletado com sucesso."
}
```

---

### Formato de Erro Padronizado

Todos os erros seguem o mesmo formato, gerado pelo `GlobalExceptionFilter`:

```json
{
  "statusCode": 404,
  "message": "Carro não encontrado.",
  "path": "/carros/99",
  "timestamp": "2026-05-22T14:30:00.000Z"
}
```

---

## Estrutura do Projeto

```
src/
├── app.module.ts               # Módulo raiz (TypeORM, Throttler, importações)
├── main.ts                     # Bootstrap (Helmet, CORS, Swagger, ValidationPipe)
│
├── auth/                       # Módulo de autenticação
│   ├── authController.ts       # POST /auth/login
│   ├── authModule.ts           # Configuração JWT + Passport
│   ├── authService.ts          # Lógica de login e validação de credenciais
│   └── jwtStrategy.ts          # Estratégia Passport para tokens Bearer
│
├── common/
│   └── filters/
│       └── global-exception.filter.ts  # Tratamento e padronização de erros
│
├── domain/                     # Camada de domínio (zero dependência de frameworks)
│   ├── contracts/              # Interfaces dos repositórios
│   │   ├── ICarroRepository.ts
│   │   ├── IMarcaRepository.ts
│   │   └── IUsuarioRepository.ts
│   └── entity/                 # Entidades de domínio puras
│       ├── Carro.ts
│       ├── Marca.ts
│       └── Usuario.ts
│
├── application/                # Use Cases (regras de negócio)
│   ├── createCarroUseCase.ts
│   ├── createMarcaUseCase.ts
│   ├── createUsuarioUseCase.ts
│   ├── deleteCarroUseCase.ts
│   ├── deleteMarcaUseCase.ts
│   ├── deleteUsuarioUseCase.ts
│   ├── listAllCarrosUseCase.ts
│   ├── listAllMarcasUseCase.ts
│   ├── listAllUsuariosUseCase.ts
│   ├── listCarroByIdUseCase.ts
│   ├── listMarcaByIdUseCase.ts
│   ├── updateCarroUseCase.ts
│   └── updateMarcaUseCase.ts
│
├── infra/                      # Implementações de infraestrutura
│   ├── database/
│   │   └── data-source.ts      # Configuração TypeORM DataSource
│   ├── entities/               # Entidades TypeORM (mapeamento banco ↔ objeto)
│   │   ├── Carro.ts
│   │   ├── Marca.ts
│   │   └── Usuario.ts          # @BeforeInsert para hash automático da senha
│   └── repository/             # Implementação concreta dos repositórios
│       ├── carroRepository.ts
│       ├── marcaRepository.ts
│       └── usuarioRepository.ts
│
├── presentation/               # Camada de apresentação HTTP
│   ├── Controllers/
│   │   ├── carroController.ts
│   │   ├── marcaController.ts
│   │   └── usuarioController.ts
│   ├── dto/                    # Data Transfer Objects com validação
│   │   ├── create-carro.dto.ts
│   │   ├── create-marca.dto.ts
│   │   ├── create-usuario.dto.ts
│   │   ├── update-carro.dto.ts
│   │   └── update-marca.dto.ts
│   └── Modules/
│       ├── carroModule.ts
│       ├── marcaModule.ts
│       └── usuarioModule.ts
│
└── protected/
    └── homeController.ts       # Rota de teste autenticada (GET /home)

test/
└── app.e2e-spec.ts             # Testes end-to-end com Supertest
```

---

## Modelos de Dados

### Diagrama de Entidades

```
┌──────────────┐         ┌──────────────┐
│   Usuario    │         │    Marca     │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ nome         │         │ nome (único) │
│ email (único)│         └──────┬───────┘
│ senha (hash) │                │ 1
└──────────────┘                │
                                │ N
                         ┌──────┴───────┐
                         │    Carro     │
                         ├──────────────┤
                         │ id (PK)      │
                         │ placa (único)│
                         │ ano          │
                         │ modelo       │
                         │ marca_id(FK) │
                         └──────────────┘
```

**Relacionamentos:**
- `Marca` → `Carro`: **Um para Muitos** (`@OneToMany` / `@ManyToOne`)
- `Usuario` é independente — usado apenas para autenticação

---

## Segurança

### Autenticação JWT

- Tokens são assinados com `JWT_SECRET` e expiram em **24 horas**
- A estratégia Passport extrai o token do header `Authorization: Bearer <token>`
- Rotas protegidas usam `@UseGuards(AuthGuard('jwt'))` no nível do controller

### Hash de Senhas

- Implementado com `bcrypt` (salt rounds = 10)
- O hook `@BeforeInsert()` na entidade TypeORM garante que a senha **nunca** seja persistida em texto puro, mesmo que o Use Case esqueça de fazer o hash
- A senha nunca é retornada nas respostas da API

### Rate Limiting

- Limite global de **30 requisições por minuto** por IP
- Aplica-se automaticamente a todas as rotas via `APP_GUARD`
- Retorna `429 Too Many Requests` quando o limite é excedido

### Headers HTTP (Helmet)

O Helmet configura automaticamente os seguintes headers de segurança:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Content-Security-Policy`
- `X-XSS-Protection`
- Entre outros

### Validação de Entrada

- `ValidationPipe` global com `whitelist: true` — propriedades não declaradas no DTO são silenciosamente removidas, impedindo mass assignment
- `transform: true` — converte tipos automaticamente (ex: `"42"` → `42`)

---

## Scripts Disponíveis

```bash
# Sobe o container PostgreSQL em background
npm run db:up

# Para e remove os containers
npm run db:down

# Desenvolvimento com hot reload (sobe o banco automaticamente)
npm run start:dev

# Desenvolvimento sem hot reload
npm run start

# Build de produção
npm run build

# Inicia a build de produção
npm run start:prod

# Linting com correção automática
npm run lint

# Formatação com Prettier
npm run format

# Testes unitários
npm run test

# Testes unitários em modo watch
npm run test:watch

# Testes com cobertura
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

---

## Variáveis de Ambiente

Todas as variáveis listadas abaixo são **obrigatórias**. A aplicação recusa inicializar caso alguma esteja ausente, lançando um erro descritivo.

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DB_HOST` | Host do PostgreSQL | `db` (Docker) ou `127.0.0.1` (local) |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |
| `DB_DATABASE` | Nome do banco de dados | `nest_carros` |
| `JWT_SECRET` | Chave secreta para assinar tokens JWT | `um_segredo_longo_e_aleatorio` |
| `PORT` | Porta em que a API escuta | `3333` |
| `RUNNING_IN_DOCKER` | Indica se está rodando dentro do Docker Compose | `false` (local) / `true` (Docker) |
| `ALLOWED_ORIGINS` | Origens permitidas no CORS (separadas por vírgula) | `http://localhost:3000` |

> **Dica de segurança:** Em produção, o `JWT_SECRET` deve ter no mínimo 32 caracteres aleatórios. Você pode gerar um com: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## Solução de Problemas

### A aplicação não conecta ao banco de dados

Verifique se o container do banco está rodando:

```bash
docker ps
```

Se o container `my-postgres` não aparecer, suba-o manualmente:

```bash
npm run db:up
```

Se estiver rodando localmente (não no Docker Compose), certifique-se de que `RUNNING_IN_DOCKER=false` no `.env`. A aplicação resolve automaticamente `DB_HOST=db` para `127.0.0.1` nesse cenário.

---

### Erro `JWT_SECRET não definido no ambiente`

O arquivo `.env` está faltando ou a variável `JWT_SECRET` não foi definida. Execute:

```bash
cp .env.example .env
# Edite o .env e defina um valor para JWT_SECRET
```

---

### Erro `Uma ou mais variáveis de ambiente do banco de dados não foram definidas`

Alguma das variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` ou `DB_DATABASE` está ausente no `.env`. Verifique se o arquivo existe e todas as variáveis estão preenchidas.

---

### Porta 5433 já está em uso

Outra instância do PostgreSQL ou da aplicação já está usando a porta. Identifique e encerre o processo:

```bash
# Linux/macOS
lsof -i :5433

# Windows (PowerShell)
netstat -ano | findstr :5433
```

---

### Hot reload não está funcionando

Certifique-se de estar rodando com `npm run start:dev` (não `npm start`). O modo watch usa o Nest CLI com `--watch`.

---

## Licença

Este projeto é de uso privado — `UNLICENSED`.

---

<div align="center">
  Desenvolvido com NestJS + TypeScript + PostgreSQL
</div>

## Autor

**Wesley Taveira** — [@WesleyTaveira](https://github.com/WesleyTaveira)