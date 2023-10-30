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
  const [imageDims, setImageDims] = useState({});
  const type = "RECTANGLE";

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageDims({
        "width": img.width,
        "height": img.height
      })
    };
  }, []);

  const onChange = (newAnnotation) => {
    setAnnotation(newAnnotation);
  };

  const onSubmit = (annotation) => {
    const { geometry, data } = annotation;
    setAreaCoordinates(geometry);

    setAnnotation({});
    setAnnotations((prevAnnotations) => [
      ...prevAnnotations,
      {
        geometry,
        data: {
          ...data,
          id: Math.random(),
        },
      },
    ]);
  };

  const onMouseOver = (id) => (e) => {
    setActiveAnnotations([...activeAnnotations, id]);
    console.log(annotations);
  };

  const onMouseOut = (id) => (e) => {
    const index = activeAnnotations.indexOf(id);

    setActiveAnnotations([
      ...activeAnnotations.slice(0, index),
      ...activeAnnotations.slice(index, 0),
    ]);
  };

  const onDelete = (id) => e => {
    const index = annotations.indexOf(id);
    setAnnotations([
      ...annotations.slice(0, index),
      ...annotations.slice(index + 1),
    ])
  }

  const activeAnnotationComparator = (a, b) => {
    return a.data.id === b;
  };

  const onClear = () => {
    setAnnotation({});
    setAnnotations([]);
  };

  const onSave = () => {
    let jsonData = {
      "image_dims": imageDims,
      "sections": []
    }
    annotations.forEach((annotation) => {
      jsonData["sections"].push({
        "text": annotation.data.text,
        "x": annotation.geometry.x,
        "y": annotation.geometry.y,
        "height": annotation.geometry.height,
        "width": annotation.geometry.width,
      })
    });

    fetch('http://127.0.0.1:5000/update', {
      method: 'POST',
      // mode: 'cors', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className="segment-container">
      <div className="image-container">
        <div className="buttons-container">
          <Button variant="contained" onClick={() => onClear()}>
            Clear Annotations
          </Button>
          <Button variant="contained" onClick={() => onSave()}>
            Save Changes
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
          <ListSubheader component="div" id="nested-list-subheader" sx={{ width: "fit-content"}}>
            Sections
          </ListSubheader>
        }
      >
        {annotations.map((annotation) => (
          <ListItemButton
            onMouseOver={onMouseOver(annotation.data.id)}
            onMouseOut={onMouseOut(annotation.data.id)}
            onClick={onDelete(annotation.data.id)}
            key={annotation.data.id}
          >
            <ListItemText primary={annotation.data.text} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}
