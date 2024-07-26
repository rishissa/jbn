import Joi from "joi";
import { errorResponse } from "rapidjet";
export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    name: Joi.String(),
    designation: Joi.String(),
    address: Joi.String(),
    organization: Joi.String(),
    profile_pic_url: Joi.String(),
    cover_image_url: Joi.String(),
    phone_number: Joi.String(),
    whatsapp_number: Joi.String(),
    email: Joi.String(),
    instagram_handle: Joi.String(),
    website_url: Joi.String(),
    about: Joi.String(),
  });

  const result = JoiSchema.validate(req.body);

  if (result.error) {
    return res.status(400).send(
      errorResponse({
        message: result.error.message,
        details: result.error.details,
      })
    );
  }

  await next();
};
