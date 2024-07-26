import Joi from "joi";
import { errorResponse } from "rapidjet";
import Chapter from "../../chapter/models/chapter.js";
import Member_category from "../../member_category/models/member_category.js";
export const createRequest = async (req, res, next) => {
  const JoiSchema = Joi.object({
    name: Joi.string(),
    designation: Joi.string(),
    address: Joi.string(),
    organization: Joi.string(),
    profile_pic_url: Joi.string(),
    cover_image_url: Joi.string(),
    phone_number: Joi.string(),
    whatsapp_number: Joi.string(),
    email: Joi.string(),
    instagram_handle: Joi.string(),
    website_url: Joi.string(),
    about: Joi.string(),
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

export const checkMemberValidations = async (req, res, next) => {
  if (req.body.chapter) {
    const chapter = await Chapter.findById(req.body.chapter);

    if (!chapter) {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "No Chapter found" }));
    }
  }

  if (req.body.category) {
    const category = await Member_category.findById(req.body.member_category);
    if (!category) {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "No Category found" }));
    }
  }
  next();
};
