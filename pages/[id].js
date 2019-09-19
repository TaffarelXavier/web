﻿import { createMuiTheme, makeStyles, useTheme } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Search } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import PhoneIcon from "@material-ui/icons/Phone";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StarsIcon from "@material-ui/icons/Stars";
import Skeleton from "@material-ui/lab/Skeleton";
import { ThemeProvider } from "@material-ui/styles";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Loadable from "react-loadable";
import AlertNotHasProducts from "../components/AlertNotHasProducts";
import ApiRest from "../components/ApiRest";
import Categorias from "../components/Categorias";
import Footer from "../components/Footer";
import LocalStorageHandler from "../components/LocalStorageHandler";
import MyMenu from "../components/Menu";
import Produtos from "../components/Produtos";
import SpinnerTeste from "../components/SpinnerTeste/Produtos";
import TotalPedidos from "../components/TotalPedidos";
import useReplaceString from "../components/useReplaceString";
import useWidth from "../components/useWidth";

const drawerWidth = 240;

const NavigationBottom = Loadable({
  loader: () => import("../components/NavigationBottom"),
  loading() {
    return (
      <>
        <Skeleton height="80%" width="100%" />
      </>
    );
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#880e4f"
    },
    action: {
      main: "#fff"
    }
  }
});

const useStylesDrawer = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 9999
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 9999
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

function CategoriasDetalhes(props) {
  return (
    <>
      <Divider />
      <ThemeProvider theme={theme}>
        <Grid
          style={{
            maxHeight: "400px",
            overflow: "auto",
            border: "0px solid red"
          }}
        >
          <Categorias
            loadProductsByCategory={category =>
              props.loadProductsByCategory(category)
            }
            quantSkeleton={20}
          />
        </Grid>
      </ThemeProvider>
      <Divider />
      <ThemeProvider theme={theme}>
        <List>
          {[
            { itemName: "Promoções", icone: <StarsIcon /> },
            { itemName: "Meu Pedido", icone: <ShoppingCartIcon /> },
            { itemName: "Minha Conta", icone: <AccountCircleIcon /> },
            { itemName: "Pedir Por Telefone", icone: <PhoneIcon /> }
          ].map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icone}</ListItemIcon>
              <ListItemText primary={item.itemName} />
            </ListItem>
          ))}
        </List>
      </ThemeProvider>
    </>
  );
}

function DrawerCategory(props) {
  const classes = useStylesDrawer();

  const theme = useTheme();

  function handleDrawerClose() {
    props.handleDrawerClose(false);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Drawer
          className={classes.drawer}
          style={{
            opacity: props.opacity == undefined ? 1 : parseFloat(props.opacity)
          }}
          anchor="left"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <CategoriasDetalhes
            loadProductsByCategory={category =>
              props.loadProductsByCategory(category)
            }
          />
        </Drawer>
      </ThemeProvider>
    </>
  );
}

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
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: "#a40000",
    color: "#fff"
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1,
    color: "#ffffff"
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    border: "0px solid blue"
  },
  rootinput: {
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      width: "96%"
    },
    [theme.breakpoints.up("md")]: {},
    [theme.breakpoints.up("lg")]: {
      width: "96%"
    },
    margin: "0px auto",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  panelCategory: {
    borderRadius: 10,
    alignItems: "center",
    [theme.breakpoints.up("xs")]: {
      width: "96%",
      border: "0px solid lime"
    },
    [theme.breakpoints.up("sm")]: {
      width: "96%",
      border: "0px solid red"
    },
    [theme.breakpoints.up("md")]: {
      width: "96%",
      border: "0px solid green"
    },
    [theme.breakpoints.up("lg")]: {
      width: "100%",
      border: "0px solid yellow"
    },
    margin: "0px auto",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 0
  },
  textFieldInput: {
    borderRadius: 30,
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
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
    position: "absolute",
    display: "block",
    border: "0px solid gold",
    "& p": {
      border: "0px solid red",
      "& span": {}
    },
    "& div": {
      border: "0px solid lime"
    }
  },
  categorias: {
    backgroundColor: "white"
  }
}));

let ws = null;

const Index = () => {
  const router = useRouter();
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [countPedidosLocal, setCountPedidosLocal] = useState(!1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [iniciar, setIniciar] = useState(true);
  const [empresa, setEmpresa] = useState({ config: [] });
  const [nome_fantasia, setNomeFantasia] = useState("");
  const [produtos, setProdutos] = useState({ dados: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [abrirDrawer, setAbrirDrawer] = useState(!1);
  const [category, setCategory] = useState({});
  const [shopCar, setShopCar] = useState({});
  const [fetchProdutos, setFetchProdutos] = useState([]);
  const [_opacity, set_Opacity] = useState(1);

  let screenSize = useWidth();

  const isMenuOpen = Boolean(anchorEl);

  /*
  function goBack() {
    window.history.back();
  }*/

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("products")));
    onAtualizarCount();
    if (iniciar == true) {
      setIniciar(false);
      //setProdutosAsObject(props.shows);
    }
  }, []);
  let isConnected = false;
  /*
BUSCA OS DADOS DA EMPRESA
*/
  useEffect(() => {
    let id = router.query.id;

    const fetchData = async () => {
      const result = await ApiRest.get("/companies/" + id);
      setEmpresa(result.data);
    };
    fetchData();
  }, []);

  /**
   * PRODUTOS
   */

  useEffect(() => {
    setIsLoaded(false);
    const fetchData = async () => {
      if (empresaId !== null) {
        const result = await ApiRest.get("/products/company/" + empresaId);
        setProdutos({ data: result.data });
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [empresaId]);

  useEffect(() => {
    if (!empresa.config) {
      if (screenSize === "xs") {
        setNomeFantasia(useReplaceString(empresa["0"].company_fantasy_name, 2));
      } else {
        setNomeFantasia(empresa["0"].company_fantasy_name);
      }
      setEmpresaId(empresa["0"].company_id);
    }
  }, [empresa]);

  /*Para fazer o filtro*/
  useEffect(() => {
    if (isLoaded) {
      if (category.length > 0) {
        set_Opacity(0.1);
        setProdutos({ data: null });

        let inCategory = JSON.parse(category);

        var arr = [];

        produtos.data.map((product, index) => {
          if (product.category_id == inCategory.category_id) {
            product.product_show = true;

            arr.push(product);
          } else {
            product.product_show = false;

            arr.push(product);
          }
        });

        setProdutos({ data: arr });
        set_Opacity(1);
      }
    }
  }, [category]);

  function onChangeInputSearch(ev) {
    let query = ev.target.value;

    setSearch(query.toUpperCase());

    let arr = [];

    if (query.trim() !== "") {
      console.log(category);

      produtos.data.map((product, index) => {
        if (
          product.product_name.toLowerCase().indexOf(query.toLowerCase()) > -1
        ) {
          product.product_show = true;

          arr.push(product);
        } else {
          product.product_show = false;

          arr.push(product);
        }
      });

      setProdutos({ data: arr });
    } else {
      setProdutos({ data: produtos });
    }
    if (ev.keyCode == 27) {
      setProdutos({ data: produtos });
      setSearch("");
    }
  }

  function onAtualizarCount() {
    setCountPedidosLocal(LocalStorageHandler.count("products"));
  }

  function handleProfileMenuOpen(event) {
    setShopCar(LocalStorageHandler.getDataByKey("products"));
    if (LocalStorageHandler.count("products") > 0) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function confirmarPedido() {
    alert(JSON.stringify(LocalStorageHandler.getDataByKey("products")));
    LocalStorageHandler.remove("products");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <DrawerCategory
        open={abrirDrawer}
        handleDrawerClose={valor => setAbrirDrawer(valor)}
        opacity={_opacity}
        loadProductsByCategory={categories => setCategory(categories)}
      />
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/*<IconButton onClick={goBack} className={classes.margin}>
            <ArrowBackIcon color="default" fontSize="large"/>
          </IconButton>*/}
          <ThemeProvider theme={theme}>
            <Hidden only={["sm", "lg", "md", "xl"]}>
              <IconButton
                color="primary"
                onClick={() => {
                  setAbrirDrawer(!0);
                }}
              >
                <MenuIcon fontSize="default" />
              </IconButton>
            </Hidden>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"
              color="error"
              noWrap
              className={classes.toolbarTitle}
            >
              {isLoaded == false ? (
                <>
                  <Skeleton variante="text" height={10} width={200} />
                </>
              ) : (
                <>
                  <Link href="../">
                    <span style={{ color: "#fff" }}>{nome_fantasia}</span>
                  </Link>
                </>
              )}
            </Typography>
          </ThemeProvider>
          {!1 && (
            <>
              <Button
                onClick={confirmarPedido}
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
              >
                CONFIRMAR PEDIDO
              </Button>
            </>
          )}
          <IconButton
            onClick={handleProfileMenuOpen}
            aria-label="Account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <TotalPedidos countProdutos={countPedidosLocal} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.cardGrid}>
        <Button
          onClick={() => {
            enviarPedido();
          }}
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
        >
          WS
        </Button>
        {isLoaded == false && (
          <>
            <br />
            <Grid container justify="center">
              <Hidden only={["xs", "xl"]}>
                <Grid item xs={12} sm={4} md={3}>
                  <Skeleton variant="text" width="90%" height={10} />
                  <Grid item>
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <div style={{ marginBottom: 20 }}>
                            <Skeleton variant="text" width="90%" height={10} />
                            <Skeleton variant="text" width="70%" height={10} />
                          </div>
                        </Fragment>
                      );
                    })}
                  </Grid>
                </Grid>
              </Hidden>
              <Grid item xs={12} sm={8} md={8}>
                <Grid item>
                  <SpinnerTeste data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {isLoaded == true && empresaId != null && (
          <>
            <br />
            {produtos.data.hasOwnProperty("erro") && produtos.data ? (
              <>
                <AlertNotHasProducts label="Não há Produtos para esta empresa." />
              </>
            ) : (
              <>
                <Grid container justify="center">
                  <Hidden only={["xs"]}>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      className={classes.categorias}
                    >
                      <Grid item>
                        <CategoriasDetalhes
                          loadProductsByCategory={categories =>
                            setCategory(categories)
                          }
                        />
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={8} md={9}>
                    <Grid item>
                      <Grid container justify="center">
                        <Grid container>
                          <Paper className={classes.rootinput}>
                            <IconButton
                              className={classes.iconButton}
                              aria-label="Search"
                            >
                              <Search />
                            </IconButton>
                            <Divider className={classes.divider} />
                            <InputBase
                              onChange={valor => onChangeInputSearch(valor)}
                              autoFocus
                              className={classes.textFieldInput}
                              placeholder="Pesquisar"
                              inputProps={{
                                "aria-label": "Search Google Maps"
                              }}
                            />
                          </Paper>
                        </Grid>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sm={9}
                            md={9}
                            lg={11}
                            className={classes.panelCategory}
                          >
                            {category.length > 0 && (
                              <>
                                <Typography>
                                  <b>
                                    CATEGORIA:{" "}
                                    {JSON.parse(category).category_name}
                                  </b>{" "}
                                  -{" "}
                                  <b>
                                    Quantidade de produtos{" "}
                                    {JSON.parse(category).amount_products}
                                  </b>
                                </Typography>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      {Object.values(produtos.data).map((product, index) => {
                        if (product.product_show == true) {
                          return (
                            <React.Fragment key={index}>
                              <Produtos
                                callbackParent={valor =>
                                  setCountPedidosLocal(valor)
                                }
                                loadProductsWithCategory={valor => true}
                                produto={product}
                                id={product.product_id}
                                nome={product.product_name.toUpperCase()}
                                imagem={product.product_image}
                                precoUnitario={2.6}
                                descricao={product.product_description}
                              />
                            </React.Fragment>
                          );
                        }
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        )}
      </Container>
      <Container className={classes.footerNavigationBottom} maxWidth="xl">
        <Footer />
      </Container>
      <MyMenu
        data={shopCar}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        abrir={isMenuOpen}
      />
    </React.Fragment>
  );
};

Index.getInitialProps = async function(ctx) {
  const configSite = await import("../db/config.dev.json");

  return {
    config: configSite
  };
};

export default Index;
