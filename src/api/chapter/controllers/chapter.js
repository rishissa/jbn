import { getPagination, getMeta, errorResponse } from "rapidjet";
import Chapter from "../models/chapter.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";

export const create = async (req, res) => {
  try {
    if (req.file) {
      const banner_url = await aws_s3_uploader(req.file);
      req.body["banner_url"] = banner_url;
    }

    const chapter = new Chapter(req.body);
    await chapter.save();
    return res.status(200).send({ data: chapter });
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
    const chapters = await Chapter.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Chapter.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: chapters, meta });
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
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Chapter not found!" }));
    }
    return res.status(200).send({ data: chapter });
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
      const banner_url = await aws_s3_uploader(req.file);
      req.body["banner_url"] = banner_url;
    }
    const chapter = await Chapter.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!chapter) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Chapter updated!", data: chapter });
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
    const chapter = await Chapter.findByIdAndDelete(id);
    if (!chapter) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Chapter deleted!" });
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
