import * as React from 'react';
import { Button, Item,View, Text,TextInput,Alert,TouchableOpacity,StyleSheet, FlatList,ScrollView, RefreshControl } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
var arr=[{}];
var len=0;
var sym="x";
function HomeScreen({ navigation }) {
  const [disable, setDisable] = React.useState(true);
  const [savedisable, setsaveDisable] = React.useState(true);
  const [getOriginal,setOriginal]=React.useState("")
  const [getDiscount,setDiscount]=React.useState("")
  const [getSave,setSave]=React.useState("0")

  const final=()=>{
    if(getOriginal=="" || getDiscount==""){
      return 0
    }
    else{
      return(parseFloat(getOriginal)-parseFloat(getSave).toFixed(2));
    }
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="History" color="black" onPress={
                () => {navigation.navigate('Details',arr)
                
                }}/>
      ),
    });
  }, [navigation]);
  //const arr=[{name:"h",age:"6",key:"1"}];
  //var obj={};
  //const [arr,setarr]=React.useState[{"name":"h","Age":"6"}]
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
            <TextInput
               underlineColorAndroid = "transparent"
               placeholder = "Enter Original Price"
               placeholderTextColor = "#9a73ef"
               color="#9a73ef"
               autoCapitalize = "none"
               onChangeText={(x)=>{
                 setOriginal(x);
                 setSave((getDiscount/100)*x)         
                 if(getDiscount!="" && x!=""){
                    setDisable(false);
                    setsaveDisable(false);                    
                 }
                 else if(getDiscount=="" && x!=""){
                    setSave("0")
                 }
                 else{
                   setDisable(true);
                   setsaveDisable(true);
                   setSave("0")
                 }
                 }}
               />
      <TextInput 
               underlineColorAndroid = "transparent"
               placeholder = "Enter the Discount Percentage"
               placeholderTextColor = "#9a73ef"
               color="#9a73ef"
               autoCapitalize = "none"
               onChangeText={(x)=>{
                 setDiscount(x);
                 setSave((x/100)*getOriginal)
                 if(getOriginal!="" && x!=""){
                    setDisable(false);
                    setsaveDisable(false);      
                 }
                 else{
                   setDisable(true);
                   setsaveDisable(true);
                 }}}
               />
               
               
      <TouchableOpacity
               style = {styles.button} disabled={savedisable}
              onPress={
                () => {
                  var obj={};
                  obj["Original"]=getOriginal;
                  obj["Discount"]=getDiscount;
                  obj["Final"]=final().toFixed(2);
                  obj["key"]=(len)+1;
                  obj["sym"]=sym;
                  len++;
                  arr.push(obj);
                  setsaveDisable(true)
                //navigation.navigate('Details')
                
                }}>
                  <Text>Save</Text>
      </TouchableOpacity>
     
      
    </View>
  );
}

function DetailsScreen({route,navigation}) {
  //const arr=[{name:"h",age:"6",key:"1"}];
  //const [Refreshing,setRefreshing]=React.useState(false)
  const deleteItem=(ky)=>{
    var h=parseInt(ky);
    
    arr.splice(h,1)
    //console.log(myArray)
    
  }

  const renderItem = ({ item }) => (
    
    
    <View style={{flexDirection:'row'}}>
    <Text style={{marginLeft:"10%"}}>{item.key}</Text>
    <Text style={{marginLeft:"15%"}}>{item.Original}</Text>
    <Text style={{marginLeft:"20%"}}>{item.Discount}</Text>
    <Text style={{marginLeft:"15%"}}>{item.Final}</Text>
    <TouchableOpacity onPress={() => {
      if(arr.length==1){
        alert("The Data will be deleted from start");
        arr.shift();
        navigation.navigate("Details");
      }
      else{
      arr.splice((item.key),1);
      alert("The Data will be deleted");
      navigation.navigate("Details");
      }
       }}
      >
    <Text style={{marginLeft:"15%",color:"red"}}>{item.sym}</Text>
    </TouchableOpacity>
  
    </View>
    
    
    
  );
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
  <Text>Details Screen</Text>
      <View style={{flexDirection:'row'}}>
    <Text style={{marginLeft:"0%"}}>Key</Text>
    <Text style={{marginLeft:"5%"}}>Original Price</Text>
    <Text style={{marginLeft:"5%"}}>Discount</Text>
    <Text style={{marginLeft:"5%"}}>Final</Text>
    <Text style={{marginLeft:"5%"}}>Delete</Text>
    </View>
  <View style={{ backgroundcolor:"green",flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList data={arr}
        renderItem={renderItem}
        extraData={arr}
        />
      </View>
      <Button title="Go to Start Screen" color="#9a73ef" marginTop="10"
        onPress={() => navigation.navigate('Home')}/>
        <Button title="CLear" color="#9a73ef"
        onPress={() => {
          for(var i=0;i<(arr.length+1);i++){
            arr.pop();

          }
          navigation.navigate("Details")
        }}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const arr=[{}]
  //const [getOriginal,setOriginal]=React.useState("0")
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}
        options={{
            title: 'Start Screen',
            headerStyle: {
              backgroundColor: "#9a73ef",
            },
            headerTintColor: '#fff',
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="black"
              />
            ),
          }} />
        <Stack.Screen name="Details" component={DetailsScreen}
        options={{
            title: 'History Screen',
            headerStyle: {
              backgroundColor: "#9a73ef",
            },
            headerTintColor: '#fff',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1:{
    marginTop:'10%'
  },
  button: {
    
    alignItems: "center",
    backgroundColor: "#9a73ef",
    padding: 10,
    marginTop:10,
    
  },
});
export default App;
