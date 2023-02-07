import React from "react";
import axios from "axios";
import DataGridAutomobiles from "./DataGridAutomobiles";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { UserContext } from "../utils/UserContext";

const searchAutomobiles = async (data) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:6060/api/automobiles/search",
    data: data,
    headers: {
      // authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });
  return response.data;
};

export default function SearchForm() {
  const { userProfile } = React.useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [automobiles, setAutomobiles] = React.useState(null);

  const { mutate } = useMutation(searchAutomobiles, {
    onSuccess: (data) => {
      setAutomobiles(data);
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const onSubmit = async (data) => {
    const {
      manufacturer,
      model,
      type,
      fuel,
      vin,
      color,
      condition,
      priceType,
      lowestPricePoint,
      highestPricePoint,
    } = data;
    const { username, password, dealershipId } = userProfile;

    const dataAndUser = {
      username,
      password,
      dealershipId,
      data: {
        details: { manufacturer, model, type, fuel, vin, color, condition },
        priceType,
        lowestPricePoint,
        highestPricePoint,
      },
    };

    mutate(dataAndUser);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Manufacturer"
            {...register("manufacturer")}
          />
          <input type="text" placeholder="Model" {...register("model")} />
          <input type="text" placeholder="Type" {...register("type")} />
          <input type="text" placeholder="Fuel" {...register("fuel")} />
          <input type="text" placeholder="VIN" {...register("vin")} />
          <input type="text" placeholder="Color" {...register("color")} />
          <select placeholder="Condition" {...register("condition")}>
            <option value="totalled">Totalled</option>
            <option value="rough">Rough</option>
            <option value="heavily">Heavily</option>
            <option value="mostly_works">Mostly Works</option>
            <option value="lightly_used">Lightly Used</option>
            <option value="like_new">Like New</option>
            <option value="new">New</option>
          </select>
          <select placeholder="Price Type" {...register("priceType")}>
            <option value="purchase_price">Purchase Price</option>
            <option value="sale_price">Sale Price</option>
            <option value="msrp">MSRP</option>
          </select>
          <input
            type="Number"
            placeholder="Price Point (Low)"
            {...register("lowestPricePoint")}
          />
          <input
            type="Number"
            placeholder="Price Point (High)"
            {...register("highestPricePoint")}
          />
          <input type="submit" />
        </form>
        <DataGridAutomobiles automobiles={automobiles} />
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          p: 1,
          m: 2,
          bgcolor: "background.paper",
        }}
      >
        <h3>Notes</h3>
        <p>
          Ideally, automobiles should already be pre-populated with a "GET"
          method. However, the API is setup as a "POST" method with a returned
          array of objects and requires an act of querying to obtain results.
          This is due to the limitation of how I implemented the authentication
          middleware.
        </p>
        <p>
          Edits can be made into the datagrid by double clicking on one of the
          row datas and updating within there.
        </p>
        <p>
          Columns can be sorted and filtered at the header. Unfortunately, the
          buttons' UI for the sorting isn't optimal but it is functional.
        </p>
      </Box>
    </>
  );
}
