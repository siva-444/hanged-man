import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import * as storageHelper from './src/helpers/storage';
import { Button, GameBoard, WinBoard } from './src/components';
import alert from './src/helpers/alert';
import resource from './resource.json';

const { words } = resource;

export default function App() {
  const currentPlayer = new Date().getTime()

  const [roundDetails, setRoundDetails] = useState([])
  const [word, setWord] = useState("")
  const [highScore, setHighScore] = useState(0)
  const [enteredCharacter, setEnteredCharacter] = useState("");
  const [foundCharacter, setFoundCharacter] = useState([]);
  const [livesCount, setLivesCount] = useState(7);
  const [showWinBoard, setShowWinBoard] = useState(false);

  const assignWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const takingWord = words.splice(randomIndex, 1);
    setWord(takingWord[0]);
  }

  const resetGame = () => {
    assignWord()
    setEnteredCharacter("")
    setFoundCharacter([])
    setLivesCount(7)
    setShowWinBoard(false)
  }

  const reloadGame = () => {
    setRoundDetails([]);
    resetGame();
  }

  /** For next Round
   * 1.Need to store the round details in local
   * 2.After Every round need to check the current score with High score
   *  i.If current score is high means need to update the high Score in local and state
   * 3.Finally need to reset the game
   */
  const gotoNextRound = useCallback(() => {
    const currentRoundDetail = {
      round: roundDetails.length + 1,
      currentPlayer,
      foundCharacter,
      liveCount: livesCount
    }
    storageHelper.addRoundDetails(currentRoundDetail)

    if (currentRoundDetail.round > parseInt(highScore)) {
      setHighScore(currentRoundDetail.round)
      storageHelper.setHighScore(currentRoundDetail.round)
    }
    setRoundDetails(prevRound => {
      prevRound.push(currentRoundDetail)
      return prevRound;
    })
    resetGame();
  }, [roundDetails, highScore])

  /** Character submitted for to check
   * 
   * 1.Check if the character already found
   * 2.If not found means need to check with the words
   *  i.If words contain that given letter need to maintain the found letters in state
   *  ii.If all words are found need to show the Win Board Component
   * 3.If given letter not in the character means need to update the wrong guess
   *  i.While need to check the wrong Guesses exceeded the lives
   *  ii.If exceed Over the Game and reload
   *  iii.If not Means show the lives which are remain
   */
  const checkPressed = useCallback(() => {
    if (foundCharacter.includes(enteredCharacter)) {
      alert("Character already entered")
    } else if (word.includes(enteredCharacter)) {

      const foundCharacterTemp = [...foundCharacter, enteredCharacter]
      setFoundCharacter(foundCharacterTemp);
      if ([...word].every(e => foundCharacterTemp.includes(e))) {
        setShowWinBoard(true)
      }
    } else {
      if (livesCount === 0) {
        alert("Game Over", "You don't have enough lives to continue", [
          {
            text: "Reload",
            onPress: reloadGame,
            style: "default"
          }
        ], { cancelable: false })
      } else {
        alert("Wrong Guess", livesCount === 1 ? "You have no lives for the next try" : `Still you have ${livesCount - 1} lives`)
        setLivesCount(livesCount - 1);
      }
    }
    setEnteredCharacter("")
  }, [word, enteredCharacter, livesCount, foundCharacter]);

  /** ON MOUNTING
   * While Component mounting
   * 1.Need to pick the words from resource
   * 2.Need to update the High score from local
   */
  useEffect(() => {
    assignWord();
    storageHelper.getHighScore().then(high_score => setHighScore(high_score ?? 0));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>The Hanged Man</Text>
      <Text style={styles.subHeader}>Round-{roundDetails.length + 1}-{word}</Text>
      <View style={styles.box}>
        {showWinBoard
          ? <WinBoard onPress={gotoNextRound} />
          : <>
            <GameBoard word={word} highScore={highScore} livesCount={livesCount} currentScore={roundDetails.length} foundCharacter={foundCharacter} />
            <TextInput value={enteredCharacter} onChangeText={setEnteredCharacter} maxLength={1} placeholder='Enter a character' style={styles.inputStyle} />
            <Button onPress={checkPressed} title="Check" disabled={enteredCharacter === ""} />
          </>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  box: {
    marginVertical: 24,
    padding: 24,
    width: '100%'
  },
  title: {
    fontWeight: 'bold', fontSize: 18
  },
  subHeader: {
    fontWeight: '500', fontSize: 14
  },
  inputStyle: {
    backgroundColor: "#ddd",
    padding: 12,
    marginVertical: 12,
    borderRadius: 2,
    textAlign: 'center'
  }
});
