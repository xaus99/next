import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
// import { jwt } from "../../../utils";
// import jwt from "jsonwebtoken";
import { jwt } from "../../../utils";
import { NextRequest, NextResponse } from "next/server";
import Cookies from "js-cookie";

type Data =
  | {
      ok: boolean;
      message: string;
    }
  | {
      newPassword: string;
      token: string;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return changePassword(req, res);

    default:
      res.status(400).json({
        ok: false,
        message: "Bad request",
      });
  }
}

const changePassword = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.cookies;
    let userId = "";

    if (!newPassword) {
      return res.status(400).json({
        ok: false,
        message: "la nueva contraseña es requerida.",
      });
    }

    // await db.connect();

    if (!token) {
      return res.status(400).json({
        ok: false,
        message: "No hay token.",
      });
    }

    // validacion contraseña de confirmacion
    // if(newPassword != confirmPassword) {
    //    return res.status(400).json({
    //      ok: false,
    //      message: "Las contraseña no coinciden.",
    //    });
    // }

    try {
      userId = await jwt.isValidToken(token);

      await db.connect();

      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          ok: false,
          message: "Usuario no encontrado.",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({
        ok: true,
        message: "Nueva contraseña.",
      });
    } catch (error) {
      return res.status(401).json({
        ok: false,
        message: "Token de autorización no es válido",
      });
    }

    // return res.json({ token } as any);
  } catch (error) {
    console.log(error);
  }
};
