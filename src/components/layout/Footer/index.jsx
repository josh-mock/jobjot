import { Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Typography variant="body2" sx={{ textAlign: "center", mb: 2}}>
      &#169;{new Date().getFullYear()}{" "}
      <Link
        href="https://josh-mock.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Josh Mock
      </Link>
    </Typography>
  );
}
