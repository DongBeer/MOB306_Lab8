import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import React from 'react'

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(true); //isLoading giá trị mặc định là true
    const [dssp, setDssp] = useState([]);

    let url_api = 'https://651ea7ca44a3a8aa4768bda2.mockapi.io/sanpham';

    //Hàm lấy dữ liệu và đổ vào dssp
    const getListDssp = async () => {
        try {
            const strData = await fetch(url_api); //Data kiểu string

            const jsonData = await strData.json(); //Chuyển dữ liệu thành json

            setDssp(jsonData); //đổ dữ liệu vào state setDssp

        } catch (error) {
            console.error("Lỗi khi lấy Dssp từ server: " + error);
        } finally {
            //Kết thúc quá trình load dữ liệu, kể cả có lỗi cùng gọi vào lệnh này
            setIsLoading(false); //trạng thái không còn load dữ liệu nữa
        }
    }

    //Xây dựng giao diện khi render item
    const renderProduct = ({ item }) => {

        //Viết hàm xóa ở đây
        const xoaSP = () => {
            let url_api_del = 'https://651ea7ca44a3a8aa4768bda2.mockapi.io/sanpham/' + item.id;
            fetch(url_api_del, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => {
                    if (res.status == 200) { //200 cũng là xóa
                        alert("Đã xóa sản phẩm");
                        getListDssp();
                    }
                })
                .catch((exception) => {
                    console.log("Lỗi xảy ra khi xóa sản phẩm: " + exception);
                })
        }
        return (
            <View style={styles.itemPro}>
                <Text>
                    Name: {item.name} {'\n'}
                    Price: {item.price} {'\n'}
                    Image: {item.anh}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button title='Xóa' onPress={xoaSP} />
                    
                    <View style={{ margin: 5 }}></View>

                    <Button title='Sửa' onPress={() => {
                        props.navigation.navigate('Sua', { item_sp: item })
                    }} />
                </View>
            </View>
        );
    }


    //Sử dụng useEffect để cập nhật thay đổi
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => { //Theo dõi trạng thái active bằng focus
            //cập nhật giao diện ở đây
            getListDssp();
        })
        return unsubscribe;
    }, [props.navigation]);


    return (
        <View style={styles.khungDSSP}>
            <Button title='Thêm'
                onPress={() => props.navigation.navigate('Them')} />

            <Text style={{ textAlign: 'center', fontSize: 20 }}>Danh sách sản phẩm</Text>
            {
                (isLoading) ? ( //Toán tử 3 ngôi
                    <ActivityIndicator /> //True
                ) : (
                    <FlatList //False
                        data={dssp}
                        keyExtractor={(item_sp) => { return item_sp.id }}
                        renderItem={renderProduct}
                    />
                )
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    khungDSSP: {
        backgroundColor: 'white',
        flex: 1
    },
    itemPro: {
        margin: 5,
        backgroundColor: 'pink',
    },

})