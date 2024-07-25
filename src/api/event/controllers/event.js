import { getPagination, getMeta, errorResponse } from "rapidjet";
import Event from "../models/event.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";
import Chapter from "../../chapter/models/chapter.js";

export const create = async (req, res) => {
  try {
    if (req.file) {
      const banner_url = await aws_s3_uploader(req.file);
      req.body["banner_url"] = banner_url;
    }

    const chapter = await Chapter.findById(req.body.chapter);

    if (!chapter) {
      return res.status(400).send(
        errorResponse({
          status: 400,
          message: "No Chapter Found with the given ID",
        })
      );
    }

    req.body["chapter"] = chapter._id;
    const event = new Event(req.body);
    await event.save();
    return res.status(200).send({ data: event });
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
    const events = await Event.find()
      .populate("chapter")
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Event.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: events, meta });
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
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Event not found!" }));
    }
    return res.status(200).send({ data: event });
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
    if (req.file) {
      const brand_logo_url = await aws_s3_uploader(req.file);
      req.body["brand_logo_url"] = brand_logo_url;
    }
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Event updated!", data: event });
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
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Event deleted!" });
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
