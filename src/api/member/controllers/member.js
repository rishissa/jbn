import { getPagination, getMeta, errorResponse } from "rapidjet";
import Member from "../models/member.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";
import Chapter from "../../chapter/models/chapter.js";
import Member_category from "../../member_category/models/member_category.js";

export const create = async (req, res, next) => {
  try {
    if (req.file) {
      const profile_pic_url = await aws_s3_uploader(req.file);
      req.body["profile_pic_url"] = profile_pic_url;
    }
    const member = new Member(req.body);
    await member.save();
    return res.status(200).send({ data: member });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const find = async (req, res) => {
  try {
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    const members = await Member.find()
      .populate({
        path: "chapter",
        select: "name",
      })
      .populate({
        path: "member_category",
        select: "name",
      })
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Member.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: members, meta });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id)
      .populate({ path: "chapter", select: "name" })
      .populate({ path: "member_category", select: "name" });
    if (!member) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Member not found!" }));
    }
    return res.status(200).send({ data: member });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const update = async (req, res) => {
  try {
    if (req.file) {
      const profile_pic_url = await aws_s3_uploader(req.file);
      req.body["profile_pic_url"] = profile_pic_url;
    }

    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(id, req.body, { new: true });
    if (!member) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Member updated!", data: member });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Member deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};
