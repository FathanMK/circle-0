import Joi from "joi";

const ThreadSchema = Joi.object({
  content: Joi.string(),
  image: Joi.string(),
});

export default ThreadSchema;
