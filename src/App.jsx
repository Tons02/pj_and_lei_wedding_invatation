import { ThemeProvider, CssBaseline } from "@mui/material";
import Homepage from "./pages/Homepage";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Homepage />
    </ThemeProvider>
  );
}

export default App;
