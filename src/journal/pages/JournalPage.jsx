import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />
      {/* <NoteView /> */}
      <IconButton
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize:30}}/>
      </IconButton>
      {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, recusandae perspiciatis illo delectus repellat soluta voluptatem nam voluptates temporibus! Provident harum tempore itaque pariatur dolores veritatis officia consequatur. Consequatur explicabo quo, ut amet est similique qui maxime hic excepturi labore porro enim molestiae nam! Soluta earum cumque dicta consequuntur accusamus assumenda! Quae eum vitae facere modi ducimus hic aspernatur, culpa dolorem, sit doloribus deserunt. Nam?</Typography> */}
    </JournalLayout>
  );
};
