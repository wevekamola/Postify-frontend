export const loginCardStyle = (theme) => ({
    width: "100%",
    maxWidth: 400,
    padding: theme.spacing(5),
    borderRadius: theme.spacing(2),
    backgroundColor: "rgba(5, 7, 10, 0.4)",
    border: "1px solid hsla(220, 20%, 25%, 0.6)",
    color: "#fff",
    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.2)",
  });
  
  export const InputStyle = {
    "& .MuiInputBase-root": {
      backgroundColor: "#111",
      borderRadius: 2,
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#fff",
      padding: "6px 12px",
    },
    "& input": { color: "#fff" },
    "& label": { display: "none" },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
  };

  export const loginLayoutCenter = {
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  };
  