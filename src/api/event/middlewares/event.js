
        import Joi from "joi";
        import {errorResponse} from "rapidjet"            
        export const createRequest = async (req,res, next) => {
          const JoiSchema = Joi.object({
            "name": Joi.String(),
"banner_url": Joi. String(),
"date": Joi. Date(),
"venue": Joi. String(),
"description": Joi. String(),
"host_zones": Joi. String(),
"host_project_name": Joi. String(),
          });
        
          const result = JoiSchema.validate(req.body);
        
          if (result.error) {
            return res.status(400).send(errorResponse({
              message: result.error.message,
              details: result.error.details
            }));
          }
        
          await next();
        }
          