import { getPagination, getMeta, errorResponse } from "rapidjet";
import Public_data from "../models/public_data.js";

export const createAboutUs = async (req, res) => {
  try {
    let public_data = await Public_data.findOne({ _id: "about_us" });

    if (public_data) {
      public_data = await Public_data.findByIdAndUpdate(
        { _id: "about_us" },
        req.body
      );
      return res.status(200).send({ data: public_data });
    }

    req.body["_id"] = "about_us";
    public_data = new Public_data(req.body);
    await public_data.save();
    return res.status(200).send({ data: public_data });
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

export const createTermsAndConditions = async (req, res) => {
  try {
    let public_data = await Public_data.findOne({ _id: "terms" });

    if (public_data) {
      public_data = await Public_data.findByIdAndUpdate(
        { _id: "terms" },
        req.body
      );
      return res.status(200).send({ data: public_data });
    }

    req.body["_id"] = "terms";
    public_data = new Public_data(req.body);
    await public_data.save();
    return res.status(200).send({ data: public_data });
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

export const createPrivacyPolicy = async (req, res) => {
  try {
    let public_data = await Public_data.findOne({ _id: "privacy" });

    if (public_data) {
      public_data = await Public_data.findByIdAndUpdate(
        { _id: "privacy" },
        req.body
      );
      return res.status(200).send({ data: public_data });
    }

    req.body["_id"] = "privacy";
    public_data = new Public_data(req.body);
    await public_data.save();
    return res.status(200).send({ data: public_data });
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

export const find = async (req, res) => {
  try {
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    const public_datas = await Public_data.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Public_data.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: public_datas, meta });
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
    const public_data = await Public_data.findById(id);
    if (!public_data) {
      return res
        .status(404)
        .send(
          errorResponse({ status: 404, message: "Public_data not found!" })
        );
    }
    return res.status(200).send({ data: public_data });
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
    const public_data = await Public_data.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!public_data) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res
      .status(200)
      .send({ message: "Public_data updated!", data: public_data });
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
    const public_data = await Public_data.findByIdAndDelete(id);
    if (!public_data) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Public_data deleted!" });
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
