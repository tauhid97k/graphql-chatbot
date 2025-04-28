# GraphQL Chatbot API

A GraphQL API server for a chatbot system that manages conversation flows, triggers, responses, and actions.

## Features

- **Node-based Conversation Flow**: Create complex conversation trees with parent-child relationships
- **Triggers**: Define what activates specific conversation nodes (keywords, payloads, email patterns)
- **Responses**: Configure platform-specific responses with various message types
- **Actions**: Execute operations during conversations (e.g., sending emails)
- **Authentication**: Secure API with Bearer token authentication

## Setup Instructions

### Prerequisites

- Node.js v23 (Tested version)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tauhid97k/graphql-chatbot.git
   cd graphql-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=4000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The GraphQL server will be available at: http://localhost:4000

## Authentication

All API requests require authentication using a Bearer token.

**Authorization Header:**
```
Authorization: Bearer graphql-chatbot-token-2025
```

Example using curl:
```bash
curl 'http://localhost:4000/' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer graphql-chatbot-token-2025' \
  --data-raw '{"query":"query { nodes { _id name } }"}'
```

## API Documentation

### Data Types

#### Node
Represents a step in the conversation flow.

```graphql
type NodeObject {
  _id: ID!
  name: String!
  description: String
  parents: [NodeObject]
  parentIds: [ID]
  root: Boolean
  trigger: Trigger
  triggerId: ID
  responses: [Response]
  responseIds: [ID]
  actions: [Action]
  actionIds: [ID]
  preActions: [Action]
  preActionIds: [ID]
  postActions: [Action]
  postActionIds: [ID]
  priority: Float
  compositeId: ID
  global: Boolean
  colour: String
  redirect: RedirectInfo
  position: Position
  saveCompositeId: Boolean
  createdAt: Long!
  updatedAt: Long
}
```

#### Trigger
Defines conditions that activate a node.

```graphql
type Trigger {
  _id: ID!
  name: String!
  description: String
  functionString: String
  resourceTemplateId: ID
  resourceTemplate: ResourceTemplate
  createdAt: Long!
  updatedAt: Long
}
```

#### Response
Messages sent to users at each node.

```graphql
type Response {
  _id: ID! 
  name: String!
  description: String
  platforms: [ResponsePlatform]
  createdAt: Long!
  updatedAt: Long
}
```

#### Action
Operations performed during the conversation.

```graphql
type Action { 
  _id: ID! 
  name: String!
  description: String
  functionString: String
  resourceTemplateId: ID
  resourceTemplate: ResourceTemplate
  createdAt: Long!
  updatedAt: Long
}
```

### Queries

#### Get a Single Node

```graphql
query GetNode($nodeId: ID) {
  node(nodeId: $nodeId) {
    _id
    name
    description
    responses {
      _id
      name
    }
    trigger {
      _id
      name
    }
  }
}
```

Variables:
```json
{
  "nodeId": "6296be3470a0c1052f89cccb"
}
```

#### Get All Nodes

```graphql
query GetAllNodes {
  nodes {
    _id
    name
    description
    root
    global
  }
}
```

#### Get All Actions

```graphql
query GetAllActions {
  actions {
    _id
    name
    description
    resourceTemplateId
  }
}
```

#### Get All Triggers

```graphql
query GetAllTriggers {
  triggers {
    _id
    name
    description
    resourceTemplateId
  }
}
```

#### Get All Responses

```graphql
query GetAllResponses {
  responses {
    _id
    name
    description
    platforms {
      integrationId
      localeGroups {
        localeGroupId
        variations {
          name
          responses
        }
      }
    }
  }
}
```

### Example: Exploring the Conversation Flow

To explore the entire conversation flow, you can start with root nodes and traverse their children:

```graphql
query GetRootNodes {
  nodes {
    _id
    name
    root
    responses {
      _id
      name
    }
    trigger {
      _id
      name
    }
  }
}
```

## Project Structure

```
graphql-chatbot/
├── src/
│   ├── auth/
│   │   └── auth.ts          # Authentication module
│   ├── config/
│   │   └── env.ts           # Environment configuration
│   ├── datasource/
│   │   ├── action.json      # Action data
│   │   ├── dataLoader.ts    # Data loading utilities
│   │   ├── node.json        # Node data
│   │   ├── resourceTemplate.json # Resource template data
│   │   ├── response.json    # Response data
│   │   └── trigger.json     # Trigger data
│   ├── index.ts             # Main server entry point
│   ├── resolvers.ts         # GraphQL resolvers
│   └── schema.ts            # GraphQL schema
├── .env                     # Environment variables
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Data Relationships

- **Nodes** can have parent-child relationships (creating a conversation tree)
- **Nodes** can be triggered by specific inputs (Triggers)
- **Nodes** can display responses (Responses) and perform actions (Actions)
- **Actions** and **Triggers** reference resource templates for their functionality

## License

MIT
