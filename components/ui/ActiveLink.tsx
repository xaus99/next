import { useRouter } from "next/router";
import React, { CSSProperties, FC } from "react";
import Link from "next/link";
import { Button } from "@mui/material";

const active: CSSProperties = {
  color: "#0070f3",
  fontWeight: "bold",
  border: "1px solid #0070f3",
  // textDecoration: 'underline'
};

interface Props {
  label: string;
  path: string;
}

export const ActiveLink: FC<Props> = ({ label, path }) => {
  const { asPath } = useRouter();

  return (
    <Link href={`${path}`} style={{ marginRight: "20px" }}>
      {/* <Button style={asPath === path? active : undefined} >{label}</Button> */}
      <Button color={`${asPath === path ? "primary" : "info"}`}>{label}</Button>
    </Link>
  );
};
