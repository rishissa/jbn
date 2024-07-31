import { getPagination, getMeta, errorResponse } from "rapidjet";
import Member_category from "../models/member_category.js";
import Member from "../../member/models/member.js";

export const create = async (req, res) => {
  try {
    const member_category = new Member_category(req.body);
    await member_category.save();
    return res.status(200).send({ data: member_category });
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

export const find = async (req, res) => {
  try {
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    // const member_categorys = await Member_category.find()
    //   .skip(pagination.offset)
    //   .limit(pagination.limit);
    const categories = await Member_category.aggregate([
      {
        $lookup: {
          from: "members", // Collection name for members
          localField: "_id",
          foreignField: "member_category",
          as: "members",
        },
      },
      {
        $addFields: {
          memberCount: { $size: "$members" }, // Count of members in each category
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          memberCount: 1,
        },
      },
    ]);
    const counts = await Member_category.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: categories, meta });
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
    const member_category = await Member_category.findByIdAndDelete(id);
    if (!member_category) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Member_category deleted!" });
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

export const getMembersCountByCategory = async (req, res) => {
  try {
    const categories = await Member.aggregate([
      {
        $lookup: {
          from: "member_categories", // Collection name in MongoDB
          localField: "member_category",
          foreignField: "_id",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
      {
        $group: {
          _id: "$category_info._id",
          name: { $first: "$category_info.name" },
          member_count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category_id: "$_id",
          category_name: "$name",
          member_count: 1,
        },
      },
    ]);

    return res.status(200).send({ data: categories });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .send(errorResponse({ status: 400, message: err.message }));
  }
};
