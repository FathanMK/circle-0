import Joi from "joi";

const ReplySchema = Joi.object({
  content: Joi.string(),
  image: Joi.string(),
});

export default ReplySchema;
