import { getPagination, getMeta, errorResponse } from "rapidjet";
import Global from "../models/global.js";

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
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    const globals = await Global.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Global.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: globals, meta });
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
    const global = await Global.updateOne({}, { $set: data });
    if (!global) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
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
