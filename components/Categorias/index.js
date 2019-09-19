import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import ApiRest from "../ApiRest";
/**
 * Componente categoria
 */
function Categorias(props) {
  const [categorias, setCategorias] = useState({ data: null, isLoaded: false });

  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;

    const fetchData = async () => {
      const result = await ApiRest.get("/categories/company/" + id);
      setCategorias({ data: result.data, isLoaded: true });
    };
    fetchData();
  }, []); /*categorias*/

  const items = [];
  
  for(let k = 0; k < parseInt(props.quantSkeleton); k ++){
    items.push(k);
  }

  return (
    <>
      <List style={{ border: "0px solid red", padding: "0" }}>
        <ListItem>
          <ListItemText primary={<b>CATEGORIAS</b>} />
        </ListItem>
      </List>
      <Divider light variant="middle" />
      {!categorias.isLoaded && (
        <>
        {}
          {items.map((value, index) => {
            return (
              <List
                key={index}
                style={{ border: "0px solid red", padding: "0" }}
              >
                <ListItem>
                  <ListItemText
                    primary={<Skeleton width="80%" height={10} />}
                  />
                  {/* <ListItemSecondaryAction>
                      <Skeleton width="20%" height={10} />
                  </ListItemSecondaryAction> */}
                </ListItem>
              </List>
            );
          })}
        </>
      )}
      {categorias.isLoaded && (
        <>
          {categorias.data.map((category, index) => {
            return (
              <Fragment key={index}>
                <List
                  title={`Clique para pesquisar produtos da categoria: ${category.category_name}`}
                  onClick={() => {
                    props.loadProductsByCategory(JSON.stringify(category));
                  }}
                  style={{
                    border: "0px solid red",
                    padding: "0",
                    cursor: "pointer"
                  }}
                >
                  <ListItem>
                    <ListItemText
                      secondary={
                        <Typography color="secondary">
                          <b>{category.category_name.toUpperCase()}</b>
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography color="secondary">
                        <b>{category.amount_products}</b>
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <Divider light variant="middle" />
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
}

export default Categorias;
