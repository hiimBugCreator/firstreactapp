import { FlatList, StyleSheet, Text, View, Modal, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const ProductListingScreen = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [errText, setErrText] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    useEffect(() => { getProducts(); }, []);
    const getProducts = () => {
        const URL = "https://fakestoreapi.com/products";
        fetch(URL).then((res) => {
            if (!res.ok) {
                throw new Error("Somethings went wrong")
            }
            return res.json();
        }).then((data) => {
            setIsLoading(false);
            setIsRefreshing(false);
            setProducts(data);
            console.log(data);
        }).catch((er) => {
            setErrText(er.message);
            console.log(er);
        });
    }
    const onRefresh = () => {
        setIsRefreshing(true);
        setIsLoading(true);
        setProducts([]);
        getProducts();
    }
    return (
        <View>
            <Modal
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextB}>{modalData?.title}</Text>
                        <Image
                            source={{
                                uri: modalData?.image
                            }}
                            style={styles.fimage} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.modalText}>Price: {modalData?.price}</Text>
                            <View width={80} />
                            <View style={styles.stars}>
                                <Text style={styles.modalText}>Rating: ({modalData?.rating.count}) </Text>
                                <MaterialIcons
                                    name={modalData?.rating.rate >= 1 ? "star" : "star-border"}
                                    size={17}
                                    style={modalData?.rating.rate >= 1 ? styles.starSelected : styles.starUnselected} />
                                <MaterialIcons
                                    name={modalData?.rating.rate >= 2 ? "star" : "star-border"}
                                    size={17}
                                    style={modalData?.rating.rate >= 2 ? styles.starSelected : styles.starUnselected} />
                                <MaterialIcons
                                    name={modalData?.rating.rate >= 3 ? "star" : "star-border"}
                                    size={17}
                                    style={modalData?.rating.rate >= 3 ? styles.starSelected : styles.starUnselected} />
                                <MaterialIcons
                                    name={modalData?.rating.rate >= 4 ? "star" : "star-border"}
                                    size={17}
                                    style={modalData?.rating.rate >= 4 ? styles.starSelected : styles.starUnselected} />
                                <MaterialIcons
                                    name={modalData?.rating.rate >= 5 ? "star" : "star-border"}
                                    size={17}
                                    style={modalData?.rating.rate >= 5 ? styles.starSelected : styles.starUnselected} />
                            </View>
                        </View>
                        <Text style={styles.modalText}>{modalData?.description}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {
                isLoading
                    ? <ActivityIndicator color="violet" size="large" /> :
                    (errText == null) ?
                        <FlatList
                            refreshing={isRefreshing}
                            onRefresh={onRefresh}
                            numColumns={2}
                            keyExtractor={(item, index) => index}
                            data={products}
                            renderItem={({ item }) =>
                                <Pressable onPress={() => {
                                    setModalVisible(!modalVisible);
                                    setModalData(item);
                                }}>
                                    <View style={styles.cardContainer}>
                                        <Image
                                            source={{
                                                uri: item.image
                                            }}
                                            style={styles.image} />
                                        <Text numberOfLines={2}
                                            style={{
                                                fontSize: 18,
                                                textAlign: "center", width: 120
                                            }}>{item.title}</Text>
                                    </View>
                                </Pressable>
                            } /> :
                        <Text style={styles.errStyle}>
                            errText
                        </Text>
            }
        </View>
    )
}

export default ProductListingScreen

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transparent: true,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: 'violet',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'violet',
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
    },
    starSelected: {
        color: '#ffb300',
    },
    starUnselected: {
        color: '#aaa',
    },
    modalTextB: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cardContainer: {
        backgroundColor: "#fefefe",
        borderRadius: 10,
        borderColor: "violet",
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 10, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: 20,
        margin: 10,
    },
    image: {
        height: 100,
        width: 120,
        resizeMode: 'contain'
    },
    fimage: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    errStyle: {
        color: "red",
        fontSize: 18,
    }
})