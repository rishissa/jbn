import { getPagination, getMeta, errorResponse } from "rapidjet";
import Member_category from "../models/member_category.js";

export const create = async (req, res) => {
  try {
    const member_category = new Member_category(req.body);
    await member_category.save();
    return res.status(200).send({ data: member_category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
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
    const member_categorys = await Member_category.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Member_category.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: member_categorys, meta });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
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
    const member_category = await Member_category.findById(id);
    if (!member_category) {
      return res
        .status(404)
        .send(
          errorResponse({ status: 404, message: "Member_category not found!" })
        );
    }
    return res.status(200).send({ data: member_category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
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
    const { id } = req.params;
    const member_category = await Member_category.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!member_category) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res
      .status(200)
      .send({ message: "Member_category updated!", data: member_category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
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
    const member_category = await Member_category.findByIdAndDelete(id);
    if (!member_category) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Member_category deleted!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(
        errorResponse({
          status: 500,
          message: "Internal Server Error",
          details: error.message,
        })
      );
  }
};
