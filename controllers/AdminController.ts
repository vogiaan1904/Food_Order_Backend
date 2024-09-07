import { NextFunction, Request, Response } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVandor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vandor.findOne({ email: email });
  } else {
    return await Vandor.findById(id);
  }
};

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVandorInput>req.body;

  const existingVandor = await FindVandor("", email);

  if (existingVandor !== null) {
    return res.json({
      message: "A vandor has been already existing with this email Id",
    });
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdVandor = await Vandor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    salt: salt,
  });
  return res.json(createdVandor);
};

export const GetVandors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandors = await Vandor.find();
  if (vandors !== null) {
    return res.json(vandors);
  }

  return res.json({ message: "No vandors" });
};

export const GetVandorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const vandorById = await FindVandor(id);

  if (vandorById !== null) {
    return res.json(vandorById);
  }

  return res.json({ message: "No with the given id" });
};
