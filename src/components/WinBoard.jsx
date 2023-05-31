import { View, Text, StyleSheet } from 'react-native'
import Button from './Button'

const WinBoard = (props) => {
  const { onPress } = props
  return (
    <View style={styles.container}>
      <Text>You Win!</Text>
      <Button onPress={onPress} title="Next Round" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', gap: 24, alignItems: "center"
  }
})
export default WinBoard