import { getPagination, getMeta, errorResponse } from "rapidjet";
import Marquee from "../models/marquee.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";

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
        const marquee = new Marquee(body);
        await marquee.save();
        return marquee;
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
    const marquees = await Marquee.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Marquee.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: marquees, meta });
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
    const marquee = await Marquee.findById(id);
    if (!marquee) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Marquee not found!" }));
    }
    return res.status(200).send({ data: marquee });
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
    const marquee = await Marquee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!marquee) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Marquee updated!", data: marquee });
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
    const marquee = await Marquee.findByIdAndDelete(id);
    if (!marquee) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Marquee deleted!" });
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
