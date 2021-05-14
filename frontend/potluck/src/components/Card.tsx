import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import appcontext from "appcontext";
import { useHistory } from "react-router-dom";
import { Business } from "types";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  media: {
    height: 140,
    minHeight: 250,
  },
});

export default function MediaCard({ business }: { business: Business }) {
  const ctx = useContext(appcontext);
  const classes = useStyles();
  let history = useHistory();

  const { title, description, avatar, slug, deliveryLocations } = business;
  const locations = (deliveryLocations && deliveryLocations.join(", ")) ?? "";

  function handleSubscribe() {
    ctx?.setSubscribeDialogActive(true);
  }

  function goToBusiness() {
    history.push({
      pathname: `/${slug}`,
      state: {
        business: business,
      },
    });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={goToBusiness}>
        <CardMedia className={classes.media} image={avatar} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {locations && `Delivers to: ${locations}`}

            <div
              dangerouslySetInnerHTML={{
                __html: `${description.substring(0, 150)}...`,
              }}
            />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={goToBusiness}
        >
          Visit
        </Button>

        {!ctx?.subscribed && (
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
