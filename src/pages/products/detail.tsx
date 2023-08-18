import { useEffect, useState } from "react";
import { Typography, Grid, Box, Button, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { productActions } from "../../store/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { ParamsModalConfirm } from "../../types/modal";
import { DetailProduct } from "../../types/products";
import { modalActions } from "../../store/modal/modalSlice";
import ImageSlider from "../../components/ImageSlider";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.detailProduct);
  const [urlSelected, setUrlSelected] = useState<any>(product?.images?.[0]);

  const confirmApproveOrReject = (data: DetailProduct, status: string) => {
    const payload = {
      id: data.id,
      params: {
        status,
      },
    };
    const isApproved = status == "approved";
    const params: ParamsModalConfirm = {
      title: "Confirm",
      content: (
        <span>
          Do you want to {isApproved ? "approve" : "reject"} a product{" "}
          <b>"{data.name}"</b>?
        </span>
      ),
      onAction: () =>
        dispatch(
          isApproved
            ? productActions.approveProduct(payload)
            : productActions.rejectProduct(payload)
        ),
      buttonText: isApproved ? "Approve" : "Reject",
    };
    dispatch(modalActions.showModal(params));
  };

  useEffect(() => {
    dispatch(productActions.getDetailProduct(id));
  }, [dispatch]);

  useEffect(() => {
    if (product?.images) {
      setUrlSelected(product?.images[0]);
    }
  }, [product]);

  return (
    (product && (
      <Grid sx={{ width: "100%" }} p={4} container columnSpacing={4}>
        <Grid
          sx={{
            ".slick-dots li": {
              width: "50px",
              height: "50px",
            },
            ".slick-dots": {
              bottom: "-61px",
            },
          }}
          item
          xs={4}
        >
          <ImageSlider
            imagesUrl={product?.images || []}
            urlSelected={urlSelected}
            setSelected={setUrlSelected}
          />
        </Grid>
        <Grid item xs={8}>
          <Box>
            {product.approval_status == "requesting" && (
              <Box
                display={"flex"}
                gap={1}
                flexDirection={"column"}
                marginBottom={"20px"}
              >
                <Typography variant="h4" color={"red"}>
                  {
                    "This product has submitted a request for approval but has not been approved yet."
                  }
                </Typography>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={(e) => {
                      dispatch(() =>
                        confirmApproveOrReject(product, "approved")
                      );
                    }}
                  >
                    {"Approve"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    sx={{ marginLeft: "15px" }}
                    onClick={(e) => {
                      dispatch(() => confirmApproveOrReject(product, "reject"));
                    }}
                  >
                    {"Reject"}
                  </Button>
                </div>
              </Box>
            )}
            <Typography variant="h2">{product.name}</Typography>
            <Typography variant="h3">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Typography>
            <Typography sx={{ fontSize: "16px", marginTop: "20px" }}>
              Product name: {product.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              Organizer: {product.organizer.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              Category: {product.category.name}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              Approval status: {product.approval_status}
            </Typography>
            <Typography sx={{ fontSize: "16px" }}>
              Description: {product.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    )) || (
      <Typography variant="h2" paddingTop={"25px"} textAlign={"center"}>
        Product not found.
      </Typography>
    )
  );
};

export default ProductDetail;