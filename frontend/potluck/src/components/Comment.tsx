import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import appcontext from "appcontext";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 420,
    minWidth: 420,
    marginBottom: 8,
  },
  avatar: {},
}));

export default function Comment({
  text = "",
  username = "",
  date = "",
  userId = "",
  onClickDelete = () => {},
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ctx = useContext(appcontext);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDelete() {
    onClickDelete && onClickDelete();
    handleClose();
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="avatar" className={classes.avatar}>
            {username.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="optoins"
            onClick={ctx?.dynamoUser?.id === userId ? handleClick : undefined}
            style={{
              opacity: ctx?.dynamoUser?.id === userId ? 1 : 0,
            }}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {text}
        </Typography>
      </CardContent>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={ctx?.dynamoUser?.id === userId ? handleDelete : undefined}
        >
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
}
