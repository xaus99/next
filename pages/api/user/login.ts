import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from "../../../utils";

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
      return loginUser(req, res);

    default:
      res.status(400).json({
        ok: false,
        message: "Bad request",
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  db.connect();
  const user = await User.findOne({ email });
  db.disconnect();

  if (!user) {
    return res.status(400).json({
      ok: false,
      message: "Correo o contraseña no válidos - EMAIL",
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({
      ok: false,
      message: "Correo o contraseña no válidos - PASS",
    });
  }

  const { role, name, _id } = user;

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
