import React, { useState } from "react";
import { Card, Box } from "@mui/material";
import Breadcrumb from "../../../src/layouts/breadcrumb/Breadcrumb";
import NoteSidebar from "../../../src/components/apps/notes/NoteSidebar";
import NoteContent from "../../../src/components/apps/notes/NoteContent";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Notes",
  },
];

const Notes = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <div>
      <Breadcrumb title="Note app" items={BCrumb} />
      <Card sx={{ display: "flex", p: 0 }}>
        <NoteSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <Box flexGrow={1}>
          <NoteContent toggleNoteSidebar={() => setMobileSidebarOpen(true)} />
        </Box>
      </Card>
    </div>
  );
};

export default Notes;
