import * as React from "react";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Box from '@mui/material/Box';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import Title from "./Title";
import Descriptor from "./Descriptor";


// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  [
    createData("06:00", 0),
    createData("08:00", 40),
    createData("10:00", 10),
    createData("12:00", 70),
    createData("14:00", 30),
    createData("16:00", 20),
    createData("18:00", 40),
    createData("20:00", 40),
    createData("22:00", 5),
  ],
  [
    createData("06:00", 0),
    createData("08:00", 30),
    createData("10:00", 20),
    createData("12:00", 60),
    createData("14:00", 35),
    createData("16:00", 25),
    createData("18:00", 35),
    createData("20:00", 45),
    createData("22:00", 40),
  ],
  [
    createData("06:00", 0),
    createData("08:00", 15),
    createData("10:00", 70),
    createData("12:00", 55),
    createData("14:00", 65),
    createData("16:00", 60),
    createData("18:00", 45),
    createData("20:00", 40),
    createData("22:00", 10),
  ],
];

const names = ["Food", "Drinks", "Clothes"]

export default function Chart() {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  return (
    <>
      <Descriptor>Activity Tracker</Descriptor>
      <Box sx={{ display: 'flex', height: "100%", gap: "5%" }}>
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
          <LunchDiningIcon fontSize="large" cursor="pointer" onClick={() => { setTab(0); }} />
          <LocalCafeIcon fontSize="large" cursor="pointer" onClick={() => { setTab(1); }} />
          <CheckroomIcon fontSize="large" cursor="pointer" onClick={() => { setTab(2); }} />
        </Box>
        <Box sx={{height: "85%", width: "90%"}}>
          <Title>{names[tab]}</Title>
          <ResponsiveContainer>
            <LineChart
              data={data[tab]}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis
                dataKey="time"
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                style={theme.typography.body2}
                domain={[0, 100]}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: "middle",
                    fill: theme.palette.text.primary,
                    ...theme.typography.body1,
                  }}
                >
                  Activity (%)
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
}
