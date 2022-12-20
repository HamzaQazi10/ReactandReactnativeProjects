//Hamza Arshad Qazi
//SP19-BCS-084

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function App() {
  
  const [getScreen,setScreen]=useState("0")
  const [getScore,setScore]=useState(0)
  const [getinp,setinp]=useState("")
  const [getRound,setRound]=useState(1)
  const [getTries,setTries]=useState(1)
  var RandomNum1 = Math.floor(Math.random() * 20) + 1;// T0 generate Random Number
  const [RandomNum,setRandomNum]=useState(RandomNum1)
  const [getWin,setWin]=useState("Win")
  const [getNeg,setNeg]=useState(0)

  const title1="Start Button";
  const title2="Play Again";
  const title3="Finish";
  const title4="Done";
  const title5="Hint";
  //----------------------------MUST READ----------------------------
  //Note IN THIS GAME I HAVE ADDED A CRITERIA THAT THE MINIMUM SCORE TO WIN THIS GAME IS 16
  //THE GAME CONATIN TWO ROUNDS, EACH CORRECT GUESS REWARDS 10 SCORE and HINTS RESULTS IN -2 Score FOR EACH PRESS
  //-----------------------------------------------------------------

  const Uinput=(x)=>{//To display number of Screen, entered by User
    var len=getinp.length;
    if((len+1)>2){
      setinp("")
    }
    else{
      x=getinp+x;
      setinp(x)
    }
  }
  
  const Check=(RandomNumber)=>{
    var inp=getinp;
    console.log("no. is "+RandomNumber);
    var tries=getTries;
    setTries(tries+1)
    console.log("try is kkkk"+getTries)

    if(inp==RandomNumber && tries<=5){
      setRandomNum(Math.floor(Math.random() * 5) + 1)
      setScore(getScore+10)
      //setTries(0)
      var round=getRound;
      console.log("round is "+getRound)
      console.log("try is "+getTries)
      if(round==2){// Only two Rounds in this game
        setNeg(10-getScore)
        var score1=getScore
        console.log("dssfsff"+score1)
        if(score1<5){
          setWin("You Lose")
        }
        else{
          setWin("You Win")
        }
        setScreen("3")
        
      }
      // else if(round==1){
      //   setScreen("1")
      //   setRound(round+1)
      //   setTries(0)
      // }
      else{
        setNeg(10-getScore)
        setRound(round+1)
        setTries(0)
        console.log("try is ll"+getTries)
        setScreen("1")
      }
    
    }
    else if(inp!=RandomNumber && tries>=5){
      var score2=getScore
      console.log("dssfsff66666"+score2)
      if(score2<6){
        setWin("You Lose")
      }
      setScreen("3")
    }

    console.log("try is kkkkllll"+getTries)

    
    setinp("")
    
  }

  const Hint=()=>{
    var num=RandomNum;
    var Random = Math.floor(Math.random() * 5) + 1;
    var score=getScore;
    score=(score-2);
    setScore(score)
    if(num>Random){
      Alert.alert("Number is >"+Random)
    }
    else{
      Alert.alert("Number is <"+Random)
    }
  }
  const reset=()=>{
      setScreen("1")
       setTries(0)
       setScore(0)
       setRound(1)
       setRandomNum(Math.floor(Math.random() * 10) + 1)
  }
  const Screen1=(<View style={styles.container}>
    <Text>Welcome to NUMBER GUESSING GAME</Text>
    
    <Pressable style={styles.container4} onPress={()=>setScreen("1")}><Text style={styles.text}>{title1}</Text></Pressable>  
    </View>);
  const Screen3=(<View style={styles.container}>
    <Text>Number of Rounds {getRound}</Text>
    <Text>Your Score {getScore}</Text>
    <Text>Hint Negative Score -{getNeg}</Text>
    <Text>result {getWin}</Text>
    
    
    <Pressable style={styles.container4} onPress={()=>reset()}><Text style={styles.text}>{title2}</Text></Pressable>  
    <Pressable style={styles.container4} onPress={()=>setScreen("0")}><Text style={styles.text}>{title3}</Text></Pressable>  
     
    </View>);
  
  

const Screen2=(<View style={styles.container}>
      
  <Text>Score is {getScore}</Text>
  <Text>Round is {getRound}</Text>
  <Text>Number of try is {getTries}</Text>
  <TextInput style = {styles.container1}
           underlineColorAndroid = "transparent"
           placeholder = "Enter Number Between 0-100"
           placeholderTextColor = "#9a73ef"
           color="#9a73ef"
           autoCapitalize = "none">{getinp}
           </TextInput>
  <View style={{flexDirection:'row',marginTop:"10%"}}>
  <TouchableOpacity onPress={()=>Uinput("1")}>
  <Text style = {styles.container2}> 1 </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>Uinput("2")}>
  <Text style = {styles.container2}> 2 </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>Uinput("3")}>
  <Text style = {styles.container2}> 3 </Text>
    </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row',marginTop:'-30%'}}>
  <TouchableOpacity onPress={()=>Uinput("4")}>
  <Text style = {styles.container2}> 4 </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>Uinput("5")}>
  <Text style = {styles.container2}> 5 </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>Uinput("6")}>
  <Text style = {styles.container2}> 6 </Text>
    </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row',marginTop:'-35%'}}>
  <TouchableOpacity onPress={()=>Uinput("7")}>
  <Text style = {styles.container2}> 7 </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>Uinput("8")}>
  <Text style = {styles.container2}> 8 </Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>Uinput("9")}>
  <Text style = {styles.container2}> 9 </Text>
    </TouchableOpacity>
    </View>
    <View style={{flexDirection:'row',marginTop:'-35%'}}>
    <TouchableOpacity onPress={()=>Uinput("0")}>
  <Text style = {styles.container2}> 0 </Text>
    </TouchableOpacity>
    </View>
    <Pressable style={styles.container4} onPress={()=>Check(RandomNum)}><Text style={styles.text}>{title4}</Text></Pressable>  
    <Pressable style={styles.container4} onPress={()=>Hint()}><Text style={styles.text}>{title5}</Text></Pressable>  
    
  
  <StatusBar style="auto" />
</View>);


  if(getScreen=="0"){
    return (Screen1)
  }
  else if(getScreen=="1"){
    return (Screen2)
  }
  else if(getScreen=="3"){
    return (Screen3)
  }
  
    
  
    
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  container1:{
    
  },
  container2:{
    
    backgroundColor:'#1bcf96',
    //padding:'5%',
    height:'20%',
    paddingLeft:'14%',
    paddingTop:'10%',
    marginLeft:"5%",
    borderRadius: 16,
    elevation: 3,
  },
  container3:{
    flexDirection:'row',
    marginLeft:'10%'
  },
  container4:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: '#73c79c',
    
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
