import {
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import React from "react";

interface Props {
  name: string;
  region: string;
  population: number;
  flag: string;
  capital: string;
}

const Card = ({ name, region, population, flag, capital }: Props) => {
  return (
    <MuiCard sx={{ width: "20vw", marginBottom: "2rem" }}>
      <CardMedia
        sx={{ height: "15vh" }}
        image={flag}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: "1rem", fontWeight: 700 }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Population: </b> {population}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Region: </b> {region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Capital: </b> {capital}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </MuiCard>
  );
};

export default Card;
