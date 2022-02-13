// import React, {useState, useRef} from 'react';
// import {Animated, View} from 'react-native';
// import {AntDesign} from 'react-native-vector-icons';

// const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

// const AddIcon = ({item, style}) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const opacity = useRef(new Animated.Value(1)).current;
//   const reverseOpacity = useRef(new Animated.Value(0)).current;
//   const [liked, setLiked] = useState(false);

//   const like = value => {
//     Animated.sequence([
//       Animated.timing(scale, {
//         toValue: 0.9,
//         duration: 50,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scale, {
//         toValue: 1.2,
//         duration: 150,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scale, {
//         toValue: 0.9,
//         duration: 50,
//         useNativeDriver: true,
//       }),
//       Animated.parallel([
//         Animated.timing(scale, {
//           toValue: 1,
//           duration: 200,
//           useNativeDriver: true,
//         }),
//         Animated.timing(value ? opacity : reverseOpacity, {
//           toValue: 0,
//           duration: 90,
//           useNativeDriver: true,
//         }),
//         Animated.timing(value ? reverseOpacity : opacity, {
//           toValue: 1,
//           duration: 90,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start();
//     setLiked(value);
//   };

//   return (
//     <View>
//       <AnimatedIcon
//         name={'plus'}
//         size={30}
//         style={{
//           ...style,
//           position: 'absolute',
//           opacity: reverseOpacity,
//           transform: [{scale}],
//         }}
//         color="#B00000"
//         onPress={() => like(!liked)}
//       />
//       <AnimatedIcon
//         name={'plus'}
//         size={30}
//         style={{
//           ...style,
//           opacity: opacity,
//           transform: [{scale}],
//         }}
//         color="black"
//         onPress={() => like(!liked)}
//       />
//     </View>
//   );
// };
// export default AddIcon;

//-------------------------

// import React from 'react';
// import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/AntDesign';
// //import Icon from 'react-native-fontawesome';
// //import Icon from 'react-native-animicons';

// const colors = {
//   transparent: 'transparent',
//   white: '#fff',
//   heartColor: '#e92f3c',
//   textPrimary: '#515151',
//   black: '#000',
// };

// const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

// class AddIcon extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       liked: false,
//     };
//     this.lastPress = 0;
//   }

//   handleSmallAnimatedIconRef = ref => {
//     this.smallAnimatedIcon = ref;
//   };

//   animateIcon = () => {
//     const {liked} = this.state;

//     if (liked) {
//       this.smallAnimatedIcon.pulse(200);
//     } else {
//       this.smallAnimatedIcon
//         .bounceIn()
//         .then(() => {
//           this.smallAnimatedIcon.bounceIn();
//         })
//         .then(() => {
//           if (!liked) {
//             this.setState(prevState => ({liked: !prevState.liked}));
//           }
//         });
//     }
//   };

//   handleOnPressLike = () => {
//     this.smallAnimatedIcon.bounceIn();
//     this.setState(prevState => ({liked: !prevState.liked}));
//   };

//   render() {
//     const {liked} = this.state;

//     return (
//       <TouchableOpacity
//         /* activeOpacity={1} */
//         style={styles.card}
//         onPress={this.handleOnPressLike}>
//         <AnimatedIcon
//           ref={this.handleSmallAnimatedIconRef}
//           name={liked ? 'heart' : 'hearto'}
//           color={liked ? colors.heartColor : colors.textPrimary}
//           size={20}
//           style={styles.icon}
//         />
//       </TouchableOpacity>
//     );
//   }
// }

// export default AddIcon;

// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     width: 45,
//     //justifyContent: 'center',
//     //alignItems: 'center',
//     color: colors.black,
//     //backgroundColor: colors.white,
//     borderRadius: 5,
//     shadowColor: colors.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowRadius: 6,
//     shadowOpacity: 0.3,
//     elevation: 2,
//   },
//   icon: {
//     flex: 1,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
