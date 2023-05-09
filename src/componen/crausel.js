import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const crausel = () => {
    const images = [
        "https://unsplash.com/photos/pRppMPh4Zho",
        "https://unsplash.com/photos/ci7gkM_29wA"
    ]
    return (
        <View>
            <SliderBox images={images} autoPlay circleLoop dotColor={"#13274F"} inactiveDotColor="#90A4AE" ImageComponentStyle={{ borderRadius: 6, width: "94%", }} />
        </View>
    )
}

export default crausel

const styles = StyleSheet.create({})