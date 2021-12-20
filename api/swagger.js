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
          "tags": ["Words"],
          "summary": "Get all words in the catalogue",
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/GetWords"
              }
            }
          }
        }
      },
      "/api/inventory": {
        "get": {
          "tags": ["Inventory"],
          "summary": "Get the whole inventory",
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/GetInventoryLines"
              }
            }
          }
        }
      },
      "/api/basket": {
        "get": {
          "tags": ["Basket items"],
          "summary": "Get all user's words in the basket",
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/GetBasketLines"
              }
            }
          }
        }
      }
    },
    "definitions": {
      "Word": {
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
      "Words": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/Word"
        }
      },
      "BasketLine": {
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
              "$ref": "#/definitions/Word"
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
      "BasketLines": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/BasketLine"
        }
      },
      "Inventory": {
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
              "$ref": "#/definitions/Word"
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
      "InventoryLines": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/Inventory"
        }
      },
      "GetWords": {
        "properties": {
          "words": {
            "type": "object",
            "$ref": "#/definitions/Words"
          }
        }
      },
      "GetBasketLines": {
        "properties": {
          "basket": {
            "type": "object",
            "$ref": "#/definitions/BasketLines"
          }
        }
      },
      "GetInventoryLines": {
        "properties": {
          "inventory": {
            "type": "object",
            "$ref": "#/definitions/InventoryLines"
          }
        }
      }
    },
    "schemes": ["http", "https"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
  }