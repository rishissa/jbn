import { getPagination, getMeta, errorResponse } from "rapidjet";
import Global from "../models/global.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";

export const create = async (req, res) => {
  try {
    let global = await Global.findOne();

    if (global) {
      return res.status(200).send({ data: global });
    }

    global = new Global(req.body);
    await global.save();
    return res.status(200).send({ data: global });
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
    const globals = await Global.findOne();
    return res.status(200).send({ data: globals });
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

// export const findOne = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const global = await Global.findById(id);
//     if (!global) {
//       return res
//         .status(404)
//         .send(errorResponse({ status: 404, message: "Global not found!" }));
//     }
//     return res.status(200).send({ data: global });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(
//       errorResponse({
//         status: 500,
//         message: "Internal Server Error",
//         details: error.message,
//       })
//     );
//   }
// };

export const update = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      const brand_logo_url = await aws_s3_uploader(req.file);
      data["brand_logo_url"] = brand_logo_url;
    }
    const global = await Global.updateOne({}, { $set: data });
    return res.status(200).send({ message: "Global updated!", data: global });
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
    const global = await Global.findByIdAndDelete(id);
    if (!global) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Global deleted!" });
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
