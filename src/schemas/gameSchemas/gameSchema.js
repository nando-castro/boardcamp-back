import joi from "joi";

const gameSchema = joi.object({
  name: joi.string().min(1).required(),
  image: joi.string(),
  stockTotal: joi.number().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required(),
});

export default gameSchema;
