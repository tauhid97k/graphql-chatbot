export const typeDefs = `#graphql
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

    type Response {
        _id: ID! 
        name: String!
        description: String
        platforms: [ResponsePlatform]
        createdAt: Long!
        updatedAt: Long
    }

    type ResponsePlatform {
        integrationId: ID 
        build: Int
        localeGroups: [ResponseLocaleGroup]
    }

    type ResponseLocaleGroup {
        localeGroupId: ID
        variations: [ResponseVariation]
    }

    type ResponseVariation {
        name: String!
        responses: JSON
    }
    
    type ResourceTemplate {
        _id: ID!
        name: String!
        description: String
        schema: JSON
        integrationId: String
        functionString: String
        key: String
        createdAt: Long!
        updatedAt: Long
    }

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
        priority: Float
        compositeId: ID
        global: Boolean
        colour: String
        createdAt: Long!
        updatedAt: Long
    }

    type Query {
        node(nodeId: ID): NodeObject
    }
`;
