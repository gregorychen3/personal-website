import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PageHeading } from "../components/PageHeading";

/**
 * Unknown URLs used to silently redirect to the home page, which told the
 * visitor nothing and looked to search engines like every URL existing. Express
 * now serves this with a 404 status at the requested path.
 */
export function NotFoundPage() {
  return (
    <Box>
      <PageHeading
        title="page not found"
        subtitle="That page has moved or no longer exists."
      />
      <Button
        component={Link}
        to="/"
        sx={{ ml: -1, color: "primary.main", "&:hover": { backgroundColor: "action.hover" } }}
      >
        back home →
      </Button>
    </Box>
  );
}
