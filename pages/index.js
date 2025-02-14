﻿import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Menu, Search } from "@material-ui/icons";
import React, { useState } from "react";
import Loadable from "react-loadable";
import LazyLoad from "../components/LazyLoad";
import LocalStorageHandler from "../components/LocalStorageHandler";
import MyMenu from "../components/Menu";
import { TelaInicial } from "../components/SpinnerTeste";
import TotalPedidos from "../components/TotalPedidos";

const Footer = Loadable({
  loader: () => import("../components/Footer"),
  loading() {
    return <></>;
  }
});

const NavigationBottom = Loadable({
  loader: () => import("../components/NavigationBottom"),
  loading() {
    return <></>;
  }
});

const MostrarEmpresas = Loadable({
  loader: () => import("../components/MostrarEmpresas"),
  loading() {
    return (
      <>
        <LazyLoad height="30px" margintop="5px" />
      </>
    );
  }
});

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      background: "url(../static/background.jpg)",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  SiteSearchPanel__Background: {
    background:
      "-webkit-gradient(linear, left top, left bottom, color-stop(2%, rgba(236, 233, 233, 0.7)), color-stop(30%, rgba(255,255,255,0)))",
    position: "absolute",
    top: "0",
    bottom: "60%",
    left: "0",
    right: "0",
    width: "100%"
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 0)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  rootinput: {
    borderRadius: 40,
    display: "flex",
    alignItems: "center",
    width: "80%",
    margin: "0px auto",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  textFieldInput: {
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    padding: "10px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  },
  footerNavigationBottom: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(0),
    background: "white",
    position:"absolute",
    display:"block",
    border: "0px solid gold",
    margin:"0px auto",
    left:0,
    right:0,
    width:"100%",
    "& p": {
      border: "0px solid red",
      "& span": {}
    },
    "& div": {
      border: "0px solid lime"
    }
  }
}));

/*
 */

const Main = props => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const [countPedidosLocal, setCountPedidosLocal] = useState(0);

  const [isEmpresasLoaded, setIsEmpresasLoaded] = useState(!1);

  const classes = useStyles();

  const isMenuOpen = Boolean(anchorEl);

  function onAtualizarCount() {
    setCountPedidosLocal(LocalStorageHandler.count("products"));
  }

  function handleProfileMenuOpen(event) {
    onAtualizarCount();
    if (LocalStorageHandler.count("products") > 0) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    onAtualizarCount();
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function onChangeToGrid() {
    alert("Implementatio by Grid");
  }
  function onChangeToList() {
    alert("Implementatio by List");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {/* BARRA DE MENU SUPERIOR */}
      <div className={classes.SiteSearchPanel__Background} />
      <AppBar
        position="fixed"
        color="primary"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Delivery
          </Typography>
          {/* <Button
            href="#"
            color="default"
            variant="outlined"
            className={classes.link}
          >
            Entrar
          </Button> */}
          <IconButton
            onClick={handleProfileMenuOpen}
            aria-label="Account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <TotalPedidos />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <br /> <br />
        <Typography
          component="h4"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Alguma mensagem impactante aqui
        </Typography>
        <br />
        {/* INPUT */}
        <Grid>
          <Paper className={classes.rootinput}>
            <IconButton className={classes.iconButton} aria-label="Menu">
              <Menu />
            </IconButton>
            <InputBase
              className={classes.textFieldInput}
              placeholder="Pesquisar"
              inputProps={{ "aria-label": "Search Google Maps" }}
            />
            <Divider className={classes.divider} />
            <IconButton className={classes.iconButton} aria-label="Search">
              <Search />
            </IconButton>
          </Paper>
        </Grid>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        />
      </Container>
      {/* End hero unit */}
      <Container className={classes.cardGrid} maxWidth="md">
        {!isEmpresasLoaded && <TelaInicial data={[1, 2, 3, 4, 5, 6]} />}
        <MostrarEmpresas onLoadedComplete={data => setIsEmpresasLoaded(data)} />
      </Container>
      {/* MenuFooter */}
      <Container className={classes.footerNavigationBottom} maxWidth="xl">
        <Footer />
      </Container>
      {/* End footer */}
      <MyMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        abrir={isMenuOpen}
      />
      <NavigationBottom />
    </React.Fragment>
  );
};

export default Main;
