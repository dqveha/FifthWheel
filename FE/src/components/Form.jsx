import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";

export default function Form(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { formType } = props;
  const { userProfile } = React.useContext(UserContext);

  React.useEffect(() => {
    console.log(formType);
  }, [formType]);

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

    if (formType === "search") {
      const dataAndUser = {
        userProfile,
        data: {
          details: { manufacturer, model, type, fuel, vin, color, condition },
          priceType,
          lowestPricePoint,
          highestPricePoint,
        },
      };
      console.log(dataAndUser);
    }
    if (formType === "update") {
      const dataAndUser = { userProfile, data: { details: data } };
    }
  };

  return (
    <>
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
        {formType === "search" ? (
          <>
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
          </>
        ) : (
          <>
            <input type="number" placeholder="MSRP" {...register("msrp")} />
            <input
              type="number"
              placeholder="Sale Price"
              {...register("sale_price")}
            />
            <input
              type="number"
              placeholder="Purchase Price"
              {...register("purchase_price")}
            />
          </>
        )}

        <input type="submit" />
      </form>
      <CustomPaginationActionsTable />
    </>
  );
}
