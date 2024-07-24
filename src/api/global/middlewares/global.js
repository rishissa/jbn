import Joi from "joi";
import { errorResponse } from "rapidjet";
export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    brand_name: Joi.string(),
    brand_logo_url: Joi.string(),
    address: Joi.string(),
    twitter_handle: Joi.string(),
    facebook_handle: Joi.string(),
    instagram_handle: Joi.string(),
    linkedin_handle: Joi.string(),
    tagline: Joi.string(),
    phone: Joi.string(),
    brand_website_url: Joi.string(),
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
