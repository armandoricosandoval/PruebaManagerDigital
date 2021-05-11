import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateClient() {
  const initialData = {
    name: "",
    cedula: 0,
    phone: 0,
    dir: "",
  };

  useEffect(() => {
    setValues({ ...initialData });
  }, []);

  const [values, setValues] = useState(initialData);
  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const messages = (res) => {
  console.log('res :', res);

    if (res.data.status !== 'undefined') {
      <Alert variant="filled" severity="success">
        usuario creado 
      </Alert>;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api", {
      name: values.name,
      cedula: values.cedula,
      phone: values.phone,
      dir: values.dir,
    });
    messages(res);
    setValues({
        name: '',
        cedula: 0,
        phone: 0,
        dir: '',
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccessibilityNewIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nuevo Cliente
        </Typography>
        <form
          className={classes.form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                value={values.name}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={values.cedula}
                required
                fullWidth
                maxLength="10"
                name="cedula"
                label="Cedula"
                type="number"
                id="cedula"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={values.phone}
                fullWidth
                maxLength="10"
                name="phone"
                label="Phone"
                type="number"
                id="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value={values.dir }
                fullWidth
                name="dir"
                label="Direccion"
                type="text"
                id="dir"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="aceptaTerminos" color="primary" />}
                label="Acepta terminos y condiciones para crear usuarios"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"            
          >
            Guardar
          </Button>
        </form>
      </div>
    </Container>
  );
}
