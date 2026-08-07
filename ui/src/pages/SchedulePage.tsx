import { Box } from "@mui/material";
import { apiClient } from "../apiClient";
import { GigList } from "../components/GigList";
import { PageHeading } from "../components/PageHeading";
import { StatusMessage } from "../components/StatusMessage";
import { parseGigs } from "../gigs";
import { useAsync } from "../useAsync";

export function SchedulePage() {
  const state = useAsync(apiClient.fetchGigs);

  return (
    <Box>
      <PageHeading
        title="schedule"
        subtitle="Upcoming public performances, each shown in its own local time. Dates marked tbd are not yet confirmed."
      />

      {state.status === "loading" && <StatusMessage>loading…</StatusMessage>}

      {state.status === "error" && (
        <StatusMessage>
          The schedule could not be loaded just now. Please try again later.
        </StatusMessage>
      )}

      {state.status === "ready" &&
        (state.data.length === 0 ? (
          <StatusMessage>No dates on the calendar right now.</StatusMessage>
        ) : (
          <GigList gigs={parseGigs(state.data)} />
        ))}
    </Box>
  );
}
