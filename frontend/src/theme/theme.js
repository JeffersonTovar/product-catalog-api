import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          borderRadius: "12px",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#e2e8f0",
          borderBottom: "1px solid #334155",
        },
        head: {
          fontWeight: "bold",
          color: "#f8fafc",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          borderRadius: "8px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#475569",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6366f1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6366f1",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#94a3b8",
        },
      },
    },

    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#e2e8f0",
        },
      },
    },
  },
});

export default theme;
