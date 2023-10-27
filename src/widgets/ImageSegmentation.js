import { useEffect, useState } from "react";
import Annotation from "react-image-annotation";
import "../index.css";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function ImageSegmentation({
  src,
  annotations,
  setAnnotations,
  annotation,
  setAnnotation,
}) {
  const [activeAnnotations, setActiveAnnotations] = useState([]);
  const [areaCoordinates, setAreaCoordinates] = useState({});
  const type = "RECTANGLE";

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      console.log(img.height);
      console.log(img.width);
    };
  }, []);

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    setAreaCoordinates(geometry);

    setAnnotation({});
    setAnnotations([
      ...annotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ]);
    console.log(annotations);
  };

  const onMouseOver = (id) => (e) => {
    setActiveAnnotations([...activeAnnotations, id]);
  };

  const onMouseOut = (id) => (e) => {
    const index = activeAnnotations.indexOf(id);

    setActiveAnnotations([
      ...activeAnnotations.slice(0, index),
      ...activeAnnotations.slice(index, 0),
    ]);
  };

  const activeAnnotationComparator = (a, b) => {
    return a.data.id === b;
  };

  const onClear = () => {
    setAnnotation({});
    setAnnotations([]);
  };

  return (
    <div className="segment-container">
      <div className="image-container">
        <div className="buttons-container">
          <Button variant="contained" onClick={() => onClear()}>
            Clear Annotations
          </Button>
        </div>
        <Annotation
          src={src}
          alt="Dynamic Image"
          annotations={annotations}
          type={type}
          value={annotation}
          onChange={onChange}
          onSubmit={onSubmit}
          activeAnnotationComparator={activeAnnotationComparator}
          activeAnnotations={activeAnnotations}
        />
      </div>
      <List
        sx={{
          width: "20%",
          bgcolor: "background.paper",
          "& .MuiListSubheader-root": {
            fontSize: "1.5rem", // Increase the font size
            padding: "5px",
            background: "rgba(0, 123, 255, 0.1)", // Light blue background. Adjust as needed.
            fontWeight: "bold", // Makes the text bolder
            textAlign: "center",
          },
          "& .MuiListItemButton-root": {
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Add a light border between items
            padding: "8px 16px", // Padding around each list item
            "&:hover": {
              background: "rgba(0, 123, 255, 0.05)", // Light blue hover effect. Adjust as needed.
            },
          },
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Sections
          </ListSubheader>
        }
      >
        {annotations.map((annotation) => (
          <ListItemButton
            onMouseOver={onMouseOver(annotation.data.id)}
            onMouseOut={onMouseOut(annotation.data.id)}
            key={annotation.data.id}
          >
            <ListItemText primary={annotation.data.text} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
