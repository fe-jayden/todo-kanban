import React, { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

type IProviderProps = {
  children: ReactNode;
};
const RootProvider: React.FC<IProviderProps> = ({ children }) => {
  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

RootProvider.propTypes = {};

export default RootProvider;
