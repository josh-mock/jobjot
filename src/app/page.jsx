import HomeButtons from "@/app/(home)/HomeButtons";
import KanbanBoard from "@/app/(home)/Kanban/KanbanBoard";
import { auth0 } from "@/lib/auth0";
import { Button, Container, Stack, Typography } from "@mui/material";

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <Container>
        <Typography sx={{textAlign: "center", mb: 1}}>
          The best way to track your applications.
        </Typography>
        <Stack sx={{ alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            href="/auth/login?screen_hint=signup"
            sx={{ mb: 1, width: "300px" }}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="/auth/login"
            sx={{ mb: 1, width: "300px" }}
          >
            Log in
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <HomeButtons />
      <KanbanBoard />
    </Container>
  );
}
