import { View, Text, Pressable, StyleSheet } from 'react-native'

const Button = (props) => {
  const { onPress, title = "", disabled = false, ...restPressableProps } = props
  const btnContainerStyle = StyleSheet.compose(styles.container, { opacity: disabled ? 0.7 : undefined })

  return (
    <Pressable style={styles.pressable} disabled={disabled} onPress={onPress} {...restPressableProps}>
      <View style={btnContainerStyle}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'center'
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#303f9f",
    alignItems: 'center',
    borderRadius: 5
  },
  text: {
    color: "white"
  }
})
export default Button;