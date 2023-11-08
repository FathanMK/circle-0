import Joi from "joi";

const ThreadSchema = Joi.object({
  content: Joi.string().allow(""),
  image: Joi.string().allow(null),
});

export default ThreadSchema;
