import { getPagination, getMeta, errorResponse } from "rapidjet";
import Gallery from "../models/gallery.js";

export const create = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(500).send({ error: "No files uploaded" });
    } else {
      const uploadPromises = req.files.map(async (file) => {
        const fileURL = await aws_s3_uploader(file);
        const body = req.body;
        body["image_url"] = fileURL;
        body["active"] = true;
        const gallery = new Gallery(body);
        await gallery.save();
        return gallery;
      });
      const uploadedMedia = await Promise.all(uploadPromises);
      return res.status(200).send(uploadedMedia);
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
    const gallerys = await Gallery.find()
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
