import React, { FC, useContext } from "react";

import {
  Link as MuiLink,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Icon } from "../../interface";
import Link from "next/link";
import { UiContext } from "../../context/ui";

interface Props {
  lista: Icon[];
}

export const ItemMenu: FC<Props> = ({ lista }) => {
  const { toggleSideMenu } = useContext(UiContext);

  return lista.map((item, index) => {
    if (item.path !== undefined) {
      return (
        <Link
          href={item.path}
          key={index}
          onClick={toggleSideMenu}
          style={{ textDecoration: "none" }}
        >
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </Link>
      );
    } else {
      return (
        <ListItemButton key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      );
    }
  });
};
