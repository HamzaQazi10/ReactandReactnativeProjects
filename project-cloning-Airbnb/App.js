import 'react-native-gesture-handler';
import * as React from 'react';

import {
  FlatList,ActivityIndicator,TouchableOpacity,Button,Text,View,StyleSheet,TextInput,Image,ImageBackground
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//import {  ref, set } from "firebase/database";
//import {auth} from './firebase';
//import {database} from './firebase';
//import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
//import {auth} from './firebase'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,writeUserData } from "firebase/auth";
import { getDatabase,ref,set } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyA768iHXpyUaklRglT6uC2pYBwwLpm-wJg",
  authDomain: "proj-95c47.firebaseapp.com",
  projectId: "proj-95c47",
  storageBucket: "proj-95c47.appspot.com",
  messagingSenderId: "728195552806",
  appId: "1:728195552806:web:c51b23e7820da47d9938e7"
};

// Initialize Firebase
//if(initializeApp.app.length===0){
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  const database = getDatabase(app);

const FIREBASE_API_ENDPOINT ='https://proj-95c47-default-rtdb.asia-southeast1.firebasedatabase.app/';
const RAPID_API_KEY = '571fc46971msh4a206c6c2362c31p153b3cjsn94e3abf1288d';
// if(!firebaseobj.apps.length){
//   firebaseobj.initializeApp(firebaseConfig);
// }
const arr=[];
const arrComapny=[];
const arrEmail=[];
const arrPost=[];//index 0 Property type, 1 Space Type, 2 Number of Rooms, 3 Number of Washrooms, 4 no. of Guests
// 5 other Facilities
function Login({ navigation }) {
  //console.log("arr is "+arr[0]);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [issign, setissign] = useState(true)
  if(issign==true){
    console.log("lohhhhh ");
    signOut(auth).then(()=>setissign(false))
    .catch(error => alert(error.message))
  }
  const handleSihnUp=()=>{
    createUserWithEmailAndPassword(auth,email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
      const db = getDatabase();
      const userid=user.uid;
      arr.push(user.uid)
      console.log("arr is "+arr[0]);
      arrEmail[0]=user.email;
     
      var requestOptions = {//GENERATE THIS KIND OF NESTED DATA FOR OUR PROJECT
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          host: 'null',
          userdata:{
            companyname:"",
            number:"",
            street:"",
            city:"",
            country:"",
            listdata:{
              list1:{
                area:""
              }
            },
          }
        }),
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/tasks/${user.uid}.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));



      navigation.replace('Switch');
    })
    .catch(error => alert(error.message))

    
  }

  const handleLogin = () => {    
    signInWithEmailAndPassword(auth,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        if(user){
        console.log('Logged in with:', user.email);
        console.log('Logged in with ID:', user.uid);
        arr[0]=user.uid;
        arrEmail[0]=user.email
        console.log("arr is "+arr[0])
        console.log("arrEmail  is "+arrEmail[0])
        navigation.replace('Switch');
        }
        else{
          console.log("No USer")
        }
        console.log('Logged in with:', user.email);
        console.log('Logged in with:---------------------');
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      
       <View style={styles.container1} >
       <TextInput
          placeholder="Email"
          value={email}
          
          style={styles.input}
          onChangeText={x => setEmail(x)}
        />
        <TextInput
          placeholder="password"
          value={password}
          
          style={styles.input}
          onChangeText={x => setPassword(x)}
        />
        <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'12%',
      justifyContent:'center',fontWeight: "bold", borderRadius: 10,paddingLeft:"9%"}}>
          <Text onPress={()=>{
            handleLogin()
          }}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'12%',
      justifyContent:'center',fontWeight: "bold", borderRadius: 10,paddingLeft:"9%",marginTop:"3%"}}>
        <Text onPress={()=>{
            handleSihnUp()
          }}>Register</Text></TouchableOpacity>
          
          
       </View>
     
    </View>
  );
}

function Switch({ navigation }) {
  const [refs,setrefs]= useState();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [issign, setissign] = useState(true)
 
  const handleSignout=()=>{//SIGNOUT
    signOut(auth).then(()=>{
      setissign(false)
      console.log("Sign Out");
    })
    .catch(error => alert(error.message))
    navigation.replace('Log');
  }
  

const getdata=async()=>{  
  const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/.json`);
  const data1 = await response.json()
  var key=arr[0];
  console.log("key is "+key)
  const response2 = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/${key}.json`);
  const data2 = await response2.json()
  var key2=Object.keys(data2)[0]
  console.log("key2 is "+key2)
  const response3 = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/${key}/${key2}.json`);
  const data3 = await response3.json()
 
  console.log("host "+data3.host);
  if(data3.host=='null'){
    setrefs('null');
    console.log("dd")
    navigation.replace('NonHost');
  }
  else{
    console.log("rr")
    navigation.replace('Host');
  }
}
React.useEffect(() => {
  getdata();
}, [setrefs]);
if(refs){
  return (
    <View style={styles.container}>
       <View style={styles.container1} >
        <TouchableOpacity>
          <Text style={styles.container2,{backgroundColor:'red'}} onPress={()=>{
            handleSignout()
          }}>LogOut</Text>
          </TouchableOpacity>   
       </View>
    </View>
  );
        }
        else {
          console.log("Loading...")
          return (
            <View style={styles.container}>
              <ActivityIndicator color="#dc3545" size="large" />
              <Text style={{ alignSelf: 'center' }}>Loading....</Text>
            </View>
          );
        }
        
}
function HostScreen({ navigation }) {
  console.log("host screen")
  const handleSignout=()=>{//SIGNOUT
    signOut(auth).then(()=>{
      console.log("Sign Out");
    })
    .catch(error => alert(error.message))
    navigation.replace('Log');
  }
  return(
    <View style={{flex:1}}>
        <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold",marginBottom:"2%"}} onPress={()=>{
        navigation.navigate("HostAds");
      }} >
          <Text style={{ alignSelf: 'center' }}>Your Ads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold",marginBottom:"2%"}} onPress={()=>{
        navigation.navigate("PostAd");
      }} >
          <Text style={{ alignSelf: 'center' }}>Post Ad</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold"}} onPress={()=>{handleSignout()}} >
          <Text style={{ alignSelf: 'center' }}>LogOut</Text>
      </TouchableOpacity>
    
    </View>
  );
}

function HostAd({ navigation }) {
  const [getUser, setUser] = React.useState();
  
  console.log("host screen")
  const ads=async()=>{
    const iid=arr[0];//---------------------HARD CODE-----------------"6JnUMwSmitQFzXN1TMP6zRmhH5y2"
    console.log("ID is "+iid)
    // const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/.json`);
    // const data1 = await response.json()
    // //console.log("len is "+data1.length)
    // var key1=Object.keys(data2)
    // console.log("key1 is "+key1)
    const response2 = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/${iid}.json`);
    console.log("ssss");
    const data2 = await response2.json()
    var key2=Object.keys(data2)[0]
    console.log("key2 is "+key2)

    const response3 = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/${iid}/${key2}.json`);
    console.log("ssss1");
    const data3 = await response3.json()
    // var key2=Object.keys(data3)
    // console.log("key2 is "+key2)

    console.log("data is "+data3.userdata.listdata.list1[0].Space_Type)
    setUser(data3.userdata.listdata.list1);
  }


  return(
    <View style={{flex:1}}>
                <FlatList
    
    keyExtractor={(item, index) => item.key}
    data={getUser}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        style={styles.tile1}
        onPress={() => {
          console.log('wwwwwwwwwwwwwwwwwww');
          navigation.navigate('AdDetails');//, { index:index }---------------ID PASS
        }}>
         <Text>{item.Property_Type} </Text>  
        <Text>{item.Space_Type}</Text>
         
        </TouchableOpacity>)}
        />
      <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold",marginBottom:"2%"}} onPress={()=>{
        {ads()}
      }} >
          <Text style={{ alignSelf: 'center' }}>See Ads</Text>
      </TouchableOpacity>
      
    
    </View>
  );
}


function NonHostScreen({ navigation }) {
  const handleSignout=()=>{//SIGNOUT
    signOut(auth).then(()=>{
      console.log("Sign Out");
    })
    .catch(error => alert(error.message))
    navigation.replace('Log');
  }
  return(
    <View style={{flex:1}}>
    <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
      <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold"}} onPress={()=>{handleSignout()}} >
          <Text style={{ alignSelf: 'center' }}>LogOut</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
function CompanyAddress({ navigation }) {
  const [Number, setNumber] = useState('')
  const [Street, setStreet] = useState('')
  const [City, setCity] = useState('')
  const [Country, setCountry] = useState('')
const datu=async()=>{

  arr[2]=Number;
  arr[3]=Street;
  arr[4]=City;
  arr[5]=Country;
  console.log("arr")
  console.log("arr"+arr[0])
  console.log("arr"+arr[1])
  console.log("arr"+arr[2])
  console.log("arr"+arr[3])
  console.log("arr"+arr[4]);
  const iid=arr[0];
  console.log("id is "+iid);
  const response = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/.json`);
  const data1 = await response.json()
  console.log("len is "+data1.length)
  var key=Object.keys(data1)[1]
  console.log("key is "+key)
  const response2 = await fetch(`${FIREBASE_API_ENDPOINT}/tasks/${iid}.json`);
  const data2 = await response2.json()
  var key2=Object.keys(data2)[0]
  console.log("key2 is "+key2)

  var requestOptions = {//GENERATE THIS KIND OF NESTED DATA FOR OUR PROJECT
    method: 'PATCH',
    body: JSON.stringify({
      email: arrEmail[0],
      host: 'notnull',
      userdata:{
        companyname:arr[1],
        number:arr[2],
        street:arr[3],
        city:arr[4],
        country:arr[5],
        listdata:{
          list1:[{Property_Type:"2",Space_Type:"3",NoRooms:"",NoWashRooms:"",NoGuests:"",Facility:""}]
            
          
        },
      }
    }),
  };

  fetch(`${FIREBASE_API_ENDPOINT}/tasks/${iid}/${key2}.json`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
    navigation.replace("Host")
}

  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}>   
      <TextInput
          value={Number}
          placeholder="Building\House number"
          placeholderTextColor = "#dc3545"
          color="#dc3545"
          marginLeft="40%"
          onChangeText={x => {setNumber(x)}}
        />
        <TextInput
          placeholder="Enter Street Number "
          placeholderTextColor = "#dc3545"
          color="#dc3545"
          marginLeft="40%"
          onChangeText={x => {setStreet(x)}}
        />
         <TextInput
          placeholder="Enter City Name"
          placeholderTextColor = "#dc3545"
          color="#dc3545"
          marginLeft="40%"
          onChangeText={x => {setCity(x)}}
        />
          <TextInput
          placeholder="Enter Country Name"
          placeholderTextColor = "#dc3545"
          color="#dc3545"
          marginLeft="40%"
          onChangeText={x => {setCountry(x)}}
        />
      <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold"}}   
    onPress={()=>{datu()}
    }>
        <Text style={{ alignSelf: 'center' }}>Submit</Text>
      </TouchableOpacity>
      <Text style={{ alignSelf: 'center' }}>{City}</Text>
      </ImageBackground>
      
    </View>
  );
}

function CompanyName({ navigation }) {
  const [Company, setCompany] = useState('')
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}>   
      <TextInput
          value={Company}
          placeholder="Company Name"
          placeholderTextColor = "#dc3545"
          color="#dc3545"
          marginLeft="40%"
          onChangeText={x => {setCompany(x)
            console.log("Company Name "+Company)
          }}
        />
      <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold"}}   
    onPress={()=>{
      arr[1]=Company;
      console.log("companyz  "+arrComapny[0])
      navigation.navigate("CompanyAddress")
    }}>
        <Text style={{ alignSelf: 'center' }}>Next</Text>
      </TouchableOpacity>

      </ImageBackground>
      
    </View>
  );
}
function BecomeHost({ navigation }) {
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'4%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{navigation.navigate("CompanyName")}}>      
            <Text style={{ alignSelf: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
  );
}
function PropertyType({ navigation }) {
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{
          arrPost[0]="Hotel";
          navigation.navigate("Property")}}>      
            <Text style={{ alignSelf: 'center' }}>Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold",marginTop:"2%"}}
        onPress={()=>{
          arrPost[0]="Farm House";
          navigation.navigate("SpaceType")}}>      
            <Text style={{ alignSelf: 'center' }}>Farm House</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold",marginTop:"2%"}}
        onPress={()=>{
          arrPost[0]="Flat";
          navigation.navigate("SpaceType")}}>      
            <Text style={{ alignSelf: 'center' }}>Flat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold",marginTop:"2%"}}
        onPress={()=>{
          arrPost[0]="House";
          navigation.navigate("SpaceType")}}>      
            <Text style={{ alignSelf: 'center' }}>House</Text>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
  );
}
function SpaceType({ navigation }) {
  console.log("Property Type is "+arrPost[0])
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{
          arrPost[1]="Entire Space";
          navigation.navigate("Rooms")}}>      
            <Text style={{ alignSelf: 'center' }}>An Entire Space</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold",marginTop:"2%"}}
        onPress={()=>{
          arrPost[1]="Shared Space"
          navigation.navigate("Rooms")}}>      
            <Text style={{ alignSelf: 'center' }}>A Shared Space</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold",marginTop:"2%"}}
        onPress={()=>{
          arrPost[1]="Private Space";
          navigation.navigate("Rooms")}}>      
            <Text style={{ alignSelf: 'center' }}>A Private Space</Text>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
  );
}
function Rooms({ navigation }) {
  const [rooms, setrooms] = useState('')
  const [wrooms, setwrooms] = useState('')
  console.log("Space Type is "+arrPost[1]);
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}>   
      <TextInput
          value={rooms}
          placeholder="Enter Number of Rooms"
          placeholderTextColor = "black"
          color="black"
          marginLeft="30%"
          onChangeText={x => {setrooms(x)
            console.log("Rooms "+rooms)
          }}
        />
        <TextInput
          value={wrooms}
          placeholder="Enter Number of WashRooms"
          placeholderTextColor = "black"
          color="black"
          marginLeft="30%"
          onChangeText={x => {setwrooms(x)
            console.log("Wrooms "+wrooms)
          }}
        />
      <TouchableOpacity style={{backgroundColor:'black',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold"}}   
    onPress={()=>{
      arrPost[2]=rooms;
      arrPost[3]=wrooms;
      
      navigation.navigate("Guests")
    }}>
        <Text style={{ alignSelf: 'center' }}>Next</Text>
      </TouchableOpacity>

      </ImageBackground>
      
    </View>
  );
}
function Guests({ navigation }) {
  const [guest, setguest] = useState('')
  //const [wrooms, setwrooms] = useState('')
  console.log("Room Type is "+arrPost[2]+"--"+arrPost[3]);
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}>   
      <TextInput
          value={guest}
          placeholder="Enter Number of Guests You can Accomodate"
          placeholderTextColor = "black"
          color="black"
          marginLeft="30%"
          onChangeText={x => {setguest(x)
            console.log("guest "+guest)
          }}
        />

      <TouchableOpacity style={{backgroundColor:'black',width:"30%",marginLeft:"37%",height:'5%',
      justifyContent:'center',fontWeight: "bold"}}   
    onPress={()=>{
      
      arrPost[4]=guest;
      
      navigation.navigate("Facilities")
    }}>
        <Text style={{ alignSelf: 'center' }}>Next</Text>
      </TouchableOpacity>

      </ImageBackground>
      
    </View>
  );
}
function Facilities({ navigation }) {
  console.log("Guests Type is "+arrPost[4])
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{
          arrPost[5]="Swimming Pool";
          navigation.navigate("SubmitProperty")}}>      
            <Text style={{ alignSelf: 'center' }}>Swimming Pool</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'black',width:"90%",marginLeft:"5%",height:'10%',
        justifyContent:'center',fontWeight: "bold",marginTop:"2%"}}
        onPress={()=>{
          arrPost[5]="Gym";
          navigation.navigate("SubmitProperty")}}>      
            <Text style={{ alignSelf: 'center' }}>Gym</Text>
        </TouchableOpacity>

      </ImageBackground>
      
    </View>
  );
}
function SubmitProperty({ navigation }) {
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'black',width:"30%",marginLeft:"37%",height:'4%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{
          
          // Post Ad
          
          navigation.replace("PostAd")}}>      
            <Text style={{ alignSelf: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
  );
}

function PostAdStarted({ navigation }) {
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'4%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{navigation.navigate("PropertyType")}}>      
            <Text style={{ alignSelf: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
  );
}
function AdDetails({ navigation }) {
  return(
    <View style={{flex:1}}>
      <ImageBackground source = {{uri:'https://i.pinimg.com/originals/b5/f8/0e/b5f80e178e9b16a3956e02a7e4fe7be5.jpg'}}
      style={styles.image}> 
        <TouchableOpacity style={{backgroundColor:'#dc3545',width:"30%",marginLeft:"37%",height:'4%',
        justifyContent:'center',fontWeight: "bold"}}
        onPress={()=>{navigation.navigate("CompanyName")}}>      
            <Text style={{ alignSelf: 'center' }}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
      
    </View>
  );
}
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function BecomeHostRoot() {//STACK NAVIGATOR IF THE USER IS HOST
  return (
  <Stack.Navigator initialRouteName="BecomeHost">
    <Stack.Screen name="BecomeHost" component={BecomeHost} />
    <Stack.Screen name="CompanyName" component={CompanyName} />
    <Stack.Screen name="CompanyAddress" component={CompanyAddress} />
  </Stack.Navigator>
   
  );
}
function PostAd() {//STACK NAVIGATOR IF THE USER IS HOST
  return (
  <Stack.Navigator initialRouteName="PostAdStarted">
    <Stack.Screen name="PostAdStarted" component={PostAdStarted} />
    <Stack.Screen name="PropertyType" component={PropertyType} />
    <Stack.Screen name="SpaceType" component={SpaceType} />
    <Stack.Screen name="Rooms" component={Rooms} />
    <Stack.Screen name="Guests" component={Guests} />
    <Stack.Screen name="Facilities" component={Facilities} />
    <Stack.Screen name="SubmitProperty" component={SubmitProperty} />
  </Stack.Navigator>
   
  );
}
function HostAds() {//STACK NAVIGATOR IF THE USER IS HOST
  return (
  <Stack.Navigator initialRouteName="HostAd">
    <Stack.Screen name="HostAd" component={HostAd} />
    <Stack.Screen name="AdDetails" component={AdDetails} />

  </Stack.Navigator>
   
  );
}

function NonHost() {//STACK NAVIGATOR IF THE USER IS NOT HOST
  return (
    <Drawer.Navigator initialRouteName="NonHostScreen">
      <Drawer.Screen name="NonHostScreen" component={NonHostScreen} />
      <Drawer.Screen name="BecomeHost" component={BecomeHostRoot} />
    </Drawer.Navigator>
  );
}
function Host() {//STACK NAVIGATOR IF THE USER IS HOST
  return (
  <Drawer.Navigator initialRouteName="HostScreen">
    <Drawer.Screen name="HostScreen" component={HostScreen} />
    <Drawer.Screen name="PostAd" component={PostAd} />
    <Drawer.Screen name="HostAds" component={HostAds} />
  </Drawer.Navigator>
   
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Log">
        <Stack.Screen name="Log" component={Login} />
        {/* <Drawer.Screen name="CountriesWise" component={Root} /> */}
        <Stack.Screen name="Switch" component={Switch} />
        <Stack.Screen name="Host" component={Host} options={{ headerShown: false }}/>
        <Stack.Screen name="NonHost" component={NonHost}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    
  },
  container1: {
    flexDirection: 'column',
    marginRight:'5%',
    marginLeft:'5%',
    justifyContent: 'center',
    backgroundColor:'yellow',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
    container2: {
          justifyContent: 'center',
          marginRight:'5%',
    marginLeft:'5%',
    paddingBottom:'0%',
    paddingLeft:'5%',
    color: 'grey',
     
     
  },
  header: {
    height: 60,
    backgroundColor: '#6545a4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  tile: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 40,
    padding: 8,
    margin: 3,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
 
  tile1: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 40,
    padding: 8,
    margin: 3,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});
class Star extends React.Component {
  render() {
    return (
      <FontAwesome
        name={this.props.filled === true ? 'star' : 'star-o'}
        color="blue"
        size={22}
        style={{ marginHorizontal: 6 }}
      />
    );
  }
}
