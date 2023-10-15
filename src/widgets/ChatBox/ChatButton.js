import { Box, Stack } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useState } from "react";
import ChatLayout from "./ChatLayout";

export default function ChatButton(props) {
  const [visibleChat, setVisibleChat] = useState(false);

  return (
    <Box
      position="absolute"
      bottom="2%"
      right="2%"
      sx={{ width: "fit-content" }} // Ensure the width is as per the content, not stretched
    >
      <Stack direction="column" alignItems="flex-end" gap="10px">
        {/* {visibleChat && <Box 
            width="40vw" 
            height="60vh" 
            p="10px" 
            sx={{ 
              bgcolor: 'white', 
              border: 1, 
              borderColor: "text.disabled", 
              borderRadius: "20px"
            }}
          >
            hello
          </Box>
        } */}
        {visibleChat && <ChatLayout />}
        <Box
          onClick={() => setVisibleChat(prev => !prev)}
          p="20px"
          sx={{
            width: "fit-content",
            borderRadius: "50%",
            bgcolor: "white",
            borderColor: "text.disabled",
            border: 1,
          }}
        >
          <QuestionAnswerIcon fontSize="large" cursor="pointer" />
        </Box>
      </Stack>
    </Box>
  );
}
