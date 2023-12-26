import Head from "next/head";
import React from "react";
import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { Navbar, SideMenu } from "../ui";

interface Props extends PropsWithChildren {
  title: string;
}

export const DefaultLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav>
        <Navbar />
      </nav>
      <SideMenu />

      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
