import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

type Data =
  | {
      ok: boolean;
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({
        ok: false,
        message: "Bad request",
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    res.status(400).json({
      ok: false,
      message: "La contraseña no puede tener menos de 6 caracteres",
    });
  }

  if (name.length < 2) {
    res.status(400).json({
      ok: false,
      message: "El nombre no puede tener menor de 2 caracteres",
    });
  }

  if (!validations.isValidEmail(email)) {
    res.status(400).json({
      ok: false,
      message: "Correo usado no es valido",
    });
  }

  db.connect();
  const user = await User.findOne({ email });
  db.disconnect();

  if (user) {
    return res.status(400).json({
      ok: false,
      message: "El correo ya esta registrado",
    });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error, error);

    return res.status(400).json({
      ok: false,
      message: "Revisar logs del servidor",
    });
  }

  const { role, _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
