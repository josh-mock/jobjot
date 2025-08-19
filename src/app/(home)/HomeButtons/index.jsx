import AddOpportunityLink from "@/app/(home)/HomeButtons/AddOpportunityLink";
import ArchiveLink from "@/components/ui/buttons/ArchiveLink";
import ClearAllBtn from "@/app/(home)/HomeButtons/ClearAllBtn";
import { Button, Container, Stack } from "@mui/material";

export default function HomeButtons() {
  return (
    <Container>
      <Stack
        sx={{ flexDirection: "row", justifyContent: "center", gap: 2, mb: 2 }}
      >
        <AddOpportunityLink />
        <ClearAllBtn />
        <ArchiveLink />
        <Button variant="outlined" color="primary" href="/auth/logout">
          Log out
        </Button>
      </Stack>
    </Container>
  );
}
