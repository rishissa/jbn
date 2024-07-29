import { getPagination, getMeta, errorResponse } from "rapidjet";
import Calendar from "../models/calendar.js";

export const create = async (req, res) => {
  try {
    const calendar = new Calendar(req.body);
    await calendar.save();
    return res.status(200).send({ data: calendar });
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
    const tag = req.query.tag;

    let tag_query;
    if (tag) {
      tag_query = {
        tag,
      };
    }

    const pagination = await getPagination(query.pagination);
    const calendars = await Calendar.find(tag_query)
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Calendar.countDocuments({});
    const meta = await getMeta(pagination, counts);

    return res.status(200).send({ data: calendars, meta });
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
    const calendar = await Calendar.findById(id);
    if (!calendar) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Calendar not found!" }));
    }
    return res.status(200).send({ data: calendar });
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
    const calendar = await Calendar.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!calendar) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res
      .status(200)
      .send({ message: "Calendar updated!", data: calendar });
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
    const calendar = await Calendar.findByIdAndDelete(id);
    if (!calendar) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Calendar deleted!" });
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

export const getAllTags = async (req, res) => {
  try {
    const distinctTags = await Calendar.aggregate([
      { $group: { _id: "$tag" } },
      { $project: { _id: 0, tag: "$_id" } },
    ]);

    const tagsList = distinctTags.map((doc) => doc.tag);

    return res.status(200).send({ data: tagsList });
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
