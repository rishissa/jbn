import { getPagination, getMeta, errorResponse } from "rapidjet";
import Gallery from "../models/gallery.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";

export const create = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(500).send({ error: "No files uploaded" });
    } else {
      //   const uploadPromises = req.files.map(async (file) => {
      const fileURLs = await aws_s3_uploader(req.files);

      const data = fileURLs.map((file) => ({
        image_url: file,
        tag: req.body.tag,
      }));
      const gallery = await Gallery.insertMany(data);

      return res.status(200).send({ data: gallery });
    }
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
    const tag = req.query.tag;

    let tag_query;
    if (tag) {
      tag_query = {
        tag,
      };
    }
    const gallerys = await Gallery.find(tag_query)
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Gallery.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: gallerys, meta });
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
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Gallery not found!" }));
    }
    return res.status(200).send({ data: gallery });
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
    const gallery = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!gallery) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Gallery updated!", data: gallery });
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
    const gallery = await Gallery.findByIdAndDelete(id);
    if (!gallery) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Gallery deleted!" });
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

export const fetchTags = async (req, res) => {
  try {
    const distinctTags = await Gallery.aggregate([
      { $group: { _id: "$tag" } },
      { $project: { _id: 0, tag: "$_id" } },
    ]);

    const tagsList = distinctTags.map((doc) => doc.tag);

    return res.status(200).send({ data: tagsList });
  } catch (err) {
    console.log(err.message);
    return res
      .status(400)
      .send(errorResponse({ status: 400, message: err.message }));
  }
};
