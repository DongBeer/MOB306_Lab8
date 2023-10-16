import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

const Sua = (props) => {

    //Lấy dữ liệu item từ props ra để set lên InputText
    const [tenSP, setTenSP] = useState(props.route.params.item_sp.name);
    const [giaSP, setGiaSP] = useState(props.route.params.item_sp.price);

    //Hàm sửa sản phẩm
    const putProduct = () => {

        //Tạo đối tượng dữ liệu
        // let _id = props.route.params.item_sp.id;
        let _id = props.route.params.item_sp.id;

        //Tạo object sản phẩm, truyền vào 2 thuộc tính name và price. ID và image tự sinh trong Api
        let objectSP = { name: tenSP, price: giaSP };

        //Link xóa theo id
        let url_api_put = 'https://651ea7ca44a3a8aa4768bda2.mockapi.io/sanpham/' + _id; //Id lấy từ props

        fetch(url_api_put, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            //PUT và POST phải cần có body
            body: JSON.stringify(objectSP) //Ép kiểu và chuỗi Json
        })
            .then((response) => { //Lấy trạng thái trả về từ Server
                if (response.status == 200) { //200 cũng là sửa
                    alert('Sửa thành công');
                }
            })
            .catch((error) => {
                console.log("Xảy ra lỗi khi sửa sản phẩm" + error);
            })

    }

    return (
        <GestureHandlerRootView>
            <View>
                <TextInput
                    placeholder='Nhập tên mới'
                    onChangeText={(txt) => { setTenSP(txt) }}
                    value={tenSP} />

                <TextInput
                    placeholder='Nhập giá mới'
                    onChangeText={(txt) => { setGiaSP(txt) }}
                    value={giaSP + ''} />

                <Button title='Sửa' onPress={putProduct} />
            </View>
        </GestureHandlerRootView>
    )
}

export default Sua

const styles = StyleSheet.create({})