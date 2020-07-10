import * as JsonSchema from '@hyperjump/json-schema';
import schemaJson from '../schema.json';

JsonSchema.add(schemaJson, schemaJson.$id);

const validate = async (config) => {
  const schema = await JsonSchema.get(schemaJson.$id);
  const output = await JsonSchema.validate(schema, config, JsonSchema.DETAILED);

  if (!output.valid) {
    throw new Error(JSON.stringify(output, null, 2));
  }
};

export default validate;
