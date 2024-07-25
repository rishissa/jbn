import { getPagination, getMeta, errorResponse } from "rapidjet";
import Banner from "../models/banner.js";
import aws_s3_uploader from "../../../../services/s3_uploader.js";

export const create = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(500).send({ error: "No files uploaded" });
    } else {
      //   const uploadPromises = req.files.map(async (file) => {

      const desktopfileURL = await aws_s3_uploader(req.files["desktop"]);
      const mobilefileURL = await aws_s3_uploader(req.files["mobile"]);
      const body = req.body;
      body["desktop_image_url"] = desktopfileURL[0];
      body["mobile_image_url"] = mobilefileURL[0];
      const banner = new Banner(body);
      await banner.save();
      //     return banner;
      //   });
      //   const uploadedMedia = await Promise.all(uploadPromises);
      return res.status(200).send({ data: banner });
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
    const banners = await Banner.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await Banner.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: banners, meta });
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
    const banner = await Banner.findById(id);
    if (!banner) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "Banner not found!" }));
    }
    return res.status(200).send({ data: banner });
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
    if (req.files) {
      const filteredDataPromises = Object.entries(req.files).map(
        async ([fieldname, imageArray]) => {
          const imageObject = imageArray[0];
          const image_data = await aws_s3_uploader(imageObject);
          return {
            [fieldname]: image_data,
          };
        }
      );
      let filteredData = await Promise.all(filteredDataPromises);
      filteredData = Object.assign({}, ...filteredData);
      req.body = {
        ...req.body,
        ...filteredData,
      };
    }
    const { id } = req.params;
    const banner = await Banner.findByIdAndUpdate(id, req.body, { new: true });
    if (!banner) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Banner updated!", data: banner });
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
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "Banner deleted!" });
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
