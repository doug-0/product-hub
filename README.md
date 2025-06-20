# 🛒 Product Hub App

Uma aplicação web onde os usuários podem **cadastrar** e **visualizar produtos**, com funcionalidades extras de **IA para geração de descrições e imagens**.

---

## 📋 Funcionalidades

### Frontend

- ✅ Formulário para cadastro de produtos (nome, descrição, preço, imagem)
- ✅ Listagem dos produtos cadastrados
- ✅ Validações básicas (ex: preço não pode ser negativo)
- ✅ Sugestão automática de descrição se o usuário digitar apenas o nome
- ✅ Geração de imagem do produto baseada em prompt de texto

### Backend

- ✅ API RESTful com os seguintes endpoints:

| Método | Endpoint       | Descrição               |
|------- |--------------- |-------------------------|
| GET    | /products       | Lista todos os produtos |
| POST   | /products       | Cria um novo produto    |

- ✅ Integração com serviço de IA para gerar descrições e imagens
- ✅ Persistência dos dados usando MongoDB

---

## 🤖 Funcionalidades com IA

- **Geração de Descrição:**  
Ao cadastrar um produto com apenas o nome, o backend consulta uma API de IA (OpenAI API) para criar uma descrição detalhada e persuasiva.

- **Geração de Imagem:**  
Com base no texto descritivo do produto, a aplicação gera uma imagem utilizando uma API de geração de imagens com IA.

---

## ☁️ Deploy e Infraestrutura

| Serviço | Tecnologia |
|-------- |----------- |
| Frontend | React hospedado no GCP Cloud Run |
| Backend | Node.js (Express) hospedado no GCP Cloud Run |
| Banco de dados | MongoDB |
| IA | OpenAI API gpt-4.1-mini |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js (v20 ou superior)
- Conta no Mongodb - Atlas 
- Conta na OpenAI 
- Docker (opcional, para rodar com container)

### Clonando o projeto

```bash
git clone git@github.com:doug-0/product-hub.git

cd product-catalog-app
```

### Frontend

```bash

cd product-hub/frontend

npm install

cp .env.exemple .env

npm run dev

``` 

A aplicação ficará disponível na url `http://localhost:8080/`

### Backend

```bash

cd product-hub/backend

npm install

cp .env.exemple .env

npm run dev

``` 

A aplicação ficará disponível na url `http://localhost:5000/`
Deve ser preenchidos as variaveis de ambiente 
```bash
MONGO_URI=
OPENAI_API_KEY=
```