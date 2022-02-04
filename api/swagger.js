export default {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0", //version of the OpenAPI Specification
      "title": "Simple Node.js backend",
      "description": "API Documentation for a simple Node.js app used for var. demoes",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "host": "localhost:3000",
    "basePath": "/",
    "tags": [
      {
        "name": "Node-Mini",
        "description": "Backend API for the Node Mini App"
      }
    ],
    "paths": {
      "/api/words": {
        "get": {
          "tags": ["words"],
          "operationId": "Words_GET",
          "summary": "Get words in the catalogue",
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "type": "integer",
              "description": "Numeric Id of the word",
              "required": false
            },
            {
              "name": "term",
              "in": "query",
              "type": "string",
              "description": "Word term",
              "required": false
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/GetWordsReturnEntity"
              }
            }
          }
        },
        "post": {
          "tags": [ "words" ],
          "operationId": "Words_POST",
          "summary": "Add a new word into the catalogue",
          "parameters": [
            {
              "name": "word",
              "in": "body",
              "schema": {
                "$ref": "#/definitions/AddWordEntity"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/AddWordReturnEntity"
              }
            }
          },
        },
        "patch": {
          "tags": [ "words" ],
          "operationId": "Words_PATCH",
          "summary": "Updates an existing word in the catalogue",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "type": "integer",
              "description": "Numeric Id of the word",
              "required": true
            },
            {
              "name": "word",
              "in": "body",
              "schema": {
                "$ref": "#/definitions/UpdateWordEntity"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/UpdateWordReturnEntity"
              }
            }
          },
        },
        "delete": {
          "tags": [ "words" ],
          "operationId": "Words_DELETE",
          "summary": "Removes an existing word from the catalogue",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "type": "integer",
              "description": "Numeric Id of the word to delete",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success"
            }
          },
        }
      },
      "/api/inventory": {
        "get": {
          "tags": ["inventory"],
          "operationId": "Inventory_GET",
          "summary": "Get inventory information",
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "type": "integer",
              "description": "Numeric Id of the inventory entry to retrieve",
              "required": false
            },
            {
              "name": "wordId",
              "in": "query",
              "type": "integer",
              "description": "Numeric Id of the word to to retrieve inventory information",
              "required": false
            },
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/GetInventoryLinesEntity"
              }
            }
          }
        },
        "patch": {
          "tags": [ "inventory" ],
          "operationId": "Inventory_PATCH",
          "summary": "Adds qty to inventory on hand - either id or word id must be specified as a parameter",
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "type": "integer",
              "description": "Numeric Id of the inventory entry to add qty to",
              "required": false
            },
            {
              "name": "wordId",
              "in": "query",
              "type": "integer",
              "description": "Numeric Id of the word to filter to add qty to in inventory",
              "required": false
            },
            {
              "name": "qty",
              "in": "body",
              "schema": {
                "$ref": "#/definitions/AddInventoryEntity"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/AddInventoryReturnEntity"
              }
            }
          },
        },
      },
      "/api/basket": {
        "get": {
          "tags": ["basket"],
          "summary": "Get all user's words in the basket",
          "parameters": [
            {
              "name": "userId",
              "in": "path",
              "type": "string",
              "description": "Identification of the user",
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/GetBasketReturnEntity"
              }
            }
          }
        },
        "patch": {
          "tags": [ "basket" ],
          "operationId": "Basket_PATCH",
          "summary": "Modifies qty of an item in the basket",
          "parameters": [
            {
              "name": "userId",
              "in": "path",
              "type": "string",
              "description": "Identification of the user",
              "required": true
            },
            {
              "name": "wordId",
              "in": "path",
              "type": "integer",
              "description": "Numeric Id of the word in the basket, to modify the quantity of",
              "required": true
            },
            {
              "name": "qty",
              "in": "body",
              "schema": {
                "$ref": "#/definitions/UpdateBasketEntity"
              },
              "required": true
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/UpdateBasketReturnEntity"
              }
            }
          },
        },
      }
    },
    "definitions": {
      "WordEntity": {
        "required": ["term", "explanation", "formClass"],
        "properties": {
          "id": {
            "type": "integer",
            "uniqueItems": true
          },
          "term": {
            "type": "string"
          },
          "explanation": {
            "type": "string"
          },
          "formClass": {
            "type": "string"
          },
          "createdAt": {
            "format": "date-time"
          },
          "updatedAt": {
            "format": "date-time"
          }
        }
      },
      "WordsEntity": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/WordEntity"
        }
      },
      "BasketLineEntity": {
        "required": ["wordId"],
        "properties": {
          "id": {
            "type": "integer",
            "uniqueItems": true
          },
          "wordId": {
            "type": "integer"
          },
          "word": {
            "type": "object",
            "items": {
              "$ref": "#/definitions/WordEntity"
            }
          },
          "qty": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
          },
          "createdAt": {
            "format": "date-time"
          },
          "updatedAt": {
            "format": "date-time"
          }
        }
      },
      "BasketLinesEntity": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/BasketLineEntity"
        }
      },
      "InventoryLineEntity": {
        "required": ["wordId"],
        "properties": {
          "id": {
            "type": "integer",
            "uniqueItems": true
          },
          "wordId": {
            "type": "integer"
          },
          "word": {
            "type": "object",
            "items": {
              "$ref": "#/definitions/WordEntity"
            }
          },
          "qty": {
            "type": "number",
            "minimum": 0,
            "exclusiveMinimum": true
          },
          "createdAt": {
            "format": "date-time"
          },
          "updatedAt": {
            "format": "date-time"
          }
        }
      },
      "InventoryLinesEntity": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/InventoryLineEntity"
        }
      },
      "GetWordsReturnEntity": {
        "properties": {
          "words": {
            "type": "object",
            "$ref": "#/definitions/WordsEntity"
          }
        }
      },
      "GetInventoryLinesEntity": {
        "properties": {
          "inventory": {
            "type": "object",
            "$ref": "#/definitions/InventoryLinesEntity"
          }
        }
      },
      "GetBasketReturnEntity": {
        "properties": {
          "basket": {
            "type": "object",
            "$ref": "#/definitions/BasketLinesEntity"
          }
        }
      },
      "AddWordEntity": {
        "required": ["term", "explanation", "formClass"],
        "properties": {
          "term": {
            "type": "string"
          },
          "explanation": {
            "type": "string"
          },
          "formClass": {
            "type": "string"
          },
        }
      },
      "AddWordReturnEntity": {
        "properties": {
          "word": {
            "type": "object",
            "$ref": "#/definitions/WordEntity"
          }
        }
      },
      "UpdateWordEntity": {
        "required": ["explanation", "formClass"],
        "properties": {
          "explanation": {
            "type": "string"
          },
          "formClass": {
            "type": "string"
          },
        }
      },
      "UpdateWordReturnEntity": {
        "properties": {
          "word": {
            "type": "object",
            "$ref": "#/definitions/WordEntity"
          }
        }
      },
      "AddInventoryEntity": {
        "required": ["qty"],
        "properties": {
          "qty": {
            "type": "number"
          }
        }
      },
      "AddInventoryReturnEntity": {
        "properties": {
          "inventory": {
            "type": "object",
            "$ref": "#/definitions/InventoryLineEntity"
          }
        }
      },
      "UpdateBasketEntity": {
        "required": ["qty"],
        "properties": {
          "qty": {
            "type": "number"
          }
        }
      },
      "UpdateBasketReturnEntity": {
        "properties": {
          "inventory": {
            "type": "object",
            "$ref": "#/definitions/BasketLineEntity"
          }
        }
      },
    },
    "schemes": ["http", "https"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
  } // eslint-disable-line semi