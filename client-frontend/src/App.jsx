import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { Toaster } from "sonner";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  typography: {
    fontFamily: [
      "Popins-Regular",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
function App() {
  return (
    <>

        <ThemeProvider theme={theme}>
          <Toaster richColors duration={3000} position="top-center" />
          <RouterProvider router={router} />
        </ThemeProvider>
     
    </>
  );
}

export default App;
