import Joi from "joi";

const UserSchema = Joi.object({
  username: Joi.string(),
  full_name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  photo_profile: Joi.string(),
  bio: Joi.string(),
});

export default UserSchema;
