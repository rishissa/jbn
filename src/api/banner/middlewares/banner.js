import Joi from "joi";
import { errorResponse } from "rapidjet";
export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image_url: Joi.string(),
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