import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

const Them = () => {
  //Tạo state để lưu trạng thái của sản phẩm
  const [tenSP, setTenSP] = useState("");
  const [giaSP, setGiaSP] = useState("");

  const SaveProduct = () => {
    //Tạo đối tượng dữ liệu
    let objectSP = { name: tenSP, price: giaSP };
    let url_api = "https://651ea7ca44a3a8aa4768bda2.mockapi.io/sanpham";

    fetch(url_api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //Khi đẩy dữ liệu lên server phải ép kiểu về chuỗi JSON

      // Kiểu Object:
      // id: 1,
      // name: 'Sản phẩm A',
      // price: 100,

      //Kiểu chuỗi JSON:
      // "id": 1,
      // "name": "Sản phẩm A",
      // "price": 100
      body: JSON.stringify(objectSP), //PUT và POST phải cần có body
    })
      .then((res) => {
        if (res.status == 201) {
          //201 là thêm
          alert("Thêm thành công");
          setTenSP("");
          setGiaSP("");
        }
      })
      .catch((exception) => {
        console.log("Lỗi khi thêm dữ liệu lên server: " + exception);
      });
  };

  return (
    <GestureHandlerRootView>
      {/**Sử dụng GestureHandlerRootView từ thư viện: 'npm install jetifier'*/}
      <TextInput
        style={{ fontSize: 20, margin: 10 }}
        placeholder="Nhập tên sản phẩm"
        onChangeText={(txt) => {
          setTenSP(txt);
        }}
      />

      <TextInput
        style={{ fontSize: 20, margin: 10 }}
        placeholder="Nhập giá sản phẩm"
        onChangeText={(txt) => {
          setGiaSP(txt);
        }}
      />

      {/**Id và ảnh sản phẩm tự sinh */}

      <Button title="Lưu sản phẩm" onPress={SaveProduct} />
    </GestureHandlerRootView>
  );
};

export default Them;

const styles = StyleSheet.create({});
