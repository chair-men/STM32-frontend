import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Box from "@mui/material/Box";
import Title from "./Title";
import Descriptor from "./Descriptor";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

var maxActivity = 0;

// Generate Sales Data
function createData(time, amount) {
  maxActivity = maxActivity > amount ? maxActivity : amount;
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const [activeName, setActiveName] = useState("");
  const [chartData, setChartData] = useState({});
  const [chartNames, setChartNames] = useState([]);

  const chooseSection = (event) => {
    setActiveName(event.target.value);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/retrieve")
      .then((response) => response.json())
      .then((data) => {
        setChartNames(Object.keys(data));
        setActiveName(Object.keys(data)[0]);

        Object.keys(data).forEach(function (key) {
          let d = data[key];
          d.forEach((value, index, array) => {
            array[index] = createData(...value);
          });

          setChartData(prevState => ({
            ...prevState, 
            [key]: d
          }));
        });
      });
  }, []);

  return (
    <>
      <Descriptor>Activity Tracker</Descriptor>
      {chartNames.length > 0 && (
        <Box sx={{ width: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Section</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={activeName}
              label="Section"
              onChange={chooseSection}
            >
              {chartNames.map((name, idx) => {
                return <MenuItem value={name} key={idx}>{name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box sx={{ display: "flex", height: "100%", gap: "5%" }}>
        {chartNames.length > 0 && console.log(chartData)}
        {chartNames.length > 0 && (
          <Box sx={{ height: "100%", width: "90%" }}>
            <ResponsiveContainer>
              <LineChart
                data={chartData[activeName]}
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
                  domain={[0, maxActivity]}
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
        )}
      </Box>
    </>
  );
}
