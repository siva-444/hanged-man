import { View, Text, StyleSheet } from 'react-native'

const GameBoard = (props) => {
  const { highScore, livesCount, currentScore, word, foundCharacter = [] } = props
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Score: {currentScore}</Text>
        <Text>Lives: {livesCount}</Text>
        {highScore ? <Text>High Score: {highScore}</Text> : null}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 24 }}>
        {[...word].map((e, i) => (
          <Text style={[styles.blankText, { color: foundCharacter.includes(e) ? undefined : "grey" }]} key={`${e}#${i}`}>{foundCharacter.includes(e) ? e : "__"}</Text>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blankText: {
    fontSize: 24,
    fontWeight: "500",
  }
})
export default GameBoard