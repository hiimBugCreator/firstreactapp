import React from 'react'

const ProductItem = props => {
    return (
        <View style={styles.cardContainer}>
            <Image
                source={{
                    uri: props.image
                }}
                style={props.style} />
            <Text numberOfLines={1} style={{ fontSize: 18, textAlign: "center", width: 100}}>{props.name}</Text>
        </View>
    )
}

export default ProductItem