var Validator = require('jsonschema').Validator;

const schema = {
  "id": "/SubjectSchema",
  "type": "object",
  "properties": {
    "group": {"$ref": "/GroupSchema"},
    "listA": {"$ref": "/ListASchema"},
    "common": {"$ref": "/CommonSchema"}
  }
}

const GroupSchema = {
  "id": "/GroupSchema",
  "type": "object",
  "properties": {
    "id": {"type": "number"}
  }
}

const ListASchema = {
  "id": "/ListASchema",
  "type": "array",
  "items": {
    "properties": {
      "name": { "type": "string" }
    }
  }
}

const CommonSchema = {
  "id": "/CommonSchema",
  "type": "object",
  "properties": {
    "slotA": {
      "type": "array",
      items: {
        "properties": {
          "id": { "type": "number" },
          "command": { "type": "string" }
        }
      }
    },
    "slotB": {
      "properties": {
        "device": { "type": "string" },
        "active": { "type": "boolean" }
      }
    }
  }
}

const jsonData = {
  group: {
    id: 0
  },
  listA: [
    { name: 'aaas' },
    { name: 'sssd' }
  ],
  common: {
    slotA: [
      { id: 1, command: "A+B" },
      { id: 2, command: "CC" }
    ],
    slotB: { device: 'device', active: true }
  }
}

const Validate = (jsonData) => {
  let validation = new Validator();
  validation.addSchema(GroupSchema, '/GroupSchema');
  validation.addSchema(ListASchema, '/ListASchema');
  validation.addSchema(CommonSchema, '/CommonSchema');
  const result = validation.validate(jsonData, schema);
  return result;
}

const result = Validate(jsonData);
console.log(result);
