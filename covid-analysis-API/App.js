import 'react-native-gesture-handler';
import * as React from 'react';
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const RAPID_API_KEY = '571fc46971msh4a206c6c2362c31p153b3cjsn94e3abf1288d';
var arr;
function WorldScreen({ navigation }) {
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [recover, setrecover] = useState([]);
  const [critical, setcritical] = useState([]);
  const [death, setdeath] = useState([]);
  useEffect(() => {
    getData();
  }, [setData]);

  const getData = async () => {
    fetch('https://covid-19-data.p.rapidapi.com/totals', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        'x-rapidapi-key': '571fc46971msh4a206c6c2362c31p153b3cjsn94e3abf1288d',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0].confirmed);
        console.log(result[0].recovered);
        setData(result[0].confirmed);
        setrecover(result[0].recovered);
        setcritical(result[0].critical);
        setdeath(result[0].deaths);
        console.log(setData);
        setRefreshing(false);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };
  getData();
  return (
    <View style={styles.container}>
      
      <Text style={{ color: 'grey', fontSize: 16 }}>Confirmed:{data}</Text>
      <Text style={{ color: 'grey', fontSize: 16 }}>Recovered:{recover}</Text>
      <Text style={{ color: 'grey', fontSize: 16 }}>Criticals:{critical}</Text>
      <Text style={{ color: 'grey', fontSize: 16 }}>Death:{death}</Text>
    </View>
  );
}

function CountriesNameScreen({ navigation }) {
  const [getUsers, setUsers] = React.useState([]);
  const [getU, setU] = React.useState([]);
  const [isRefreshing, setRefreshing] = React.useState(false);

  const getDataFromAPI = async () => {
    setRefreshing(true);

    await fetch('https://world-population.p.rapidapi.com/allcountriesname', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'world-population.p.rapidapi.com',
        'x-rapidapi-key': '571fc46971msh4a206c6c2362c31p153b3cjsn94e3abf1288d',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        //console.log(result.body.countries)
        setUsers(result.body.countries);
        setU(result.body.countries);
        setRefreshing(false);
        console.log('------------------------');
      })
      .catch((error) => {
        console.log('Error is: ', error);
      });
  };
  React.useEffect(() => {
    getDataFromAPI();
  }, []);
  if (getUsers) {
    const searchName = (input) => {
      console.log('input is' + input);
      let data = getUsers;
      var arrr = [];
      /*let search=data.filter((item)=>{
         console.log("filters----")
         console.log("hh"+getU)
         return item.toLowerCase().includes(input.toLowerCase())
       })*/

      for (var i = 0; i < data.length; i++) {
        if (data[i].startsWith(input)) {
          console.log('Pakistan index is' + data[i]);
          arrr.push(data[i]);
        }
      }
      if (arrr.length != 0) {
        setU(arrr);
      } else {
        setU(getUsers);
      }
      console.log('arrr 1 is' + arrr[0]);
      console.log('arrr length is ' + arrr.length);
    };
    state = {
      rating: 0,
    };
    return (
      <>
        <View style={styles.header}>
          <Text style={{ fontSize: 30, color: 'white' }}>Countries</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.container1}
            underlineColorAndroid="transparent"
            placeholder="Search Country"
            placeholderTextColor="#9a73ef"
            color="#9a73ef"
            autoCapitalize="none"
            onChangeText={(x) => {
              searchName(x);
              console.log('qffffffj' + getU);
            }}
          />
          <FlatList
            refreshing={isRefreshing}
            onRefresh={getDataFromAPI}
            keyExtractor={(item, index) => item.key}
            data={getU}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.tile1}
                onPress={() => {
                  console.log('wwwwwwwwwwwwwwwwwww');
                  navigation.navigate('CountryData', { item });
                }}>
                <Text>{item}</Text>
                <TouchableOpacity
                  style={{ color: 'grey', fontSize: 16 }}
                  onPress={async () => {
                    const unparse = await AsyncStorage.getItem('fav');
                    console.log('unparse--z-' + unparse);

                    const parsed = JSON.parse(unparse);
                    //console.log('Parsed is ' + parsed[0].country);

                    const data1 = { country: item };
                    console.log('d is ' + data1);


                    if (parsed == null) {
                      console.log('ssssssssssssssss' + parsed);
                      await AsyncStorage.setItem(
                        'fav',
                        JSON.stringify([data1])
                      );
                    } else {
                      console.log('wwwwwwwwwwwwwwwwwwwwww' + parsed);
                      await AsyncStorage.setItem(
                        'fav',
                        JSON.stringify([...parsed, data1])
                      );
                    }
                  }}>
                  <Star filled={this.state.rating ? true : false} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      </>
    );
  } else {
    console.log('eeeeeeeeeeeeeee');
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#6545a4" size="large" />
        <Text style={{ alignSelf: 'center' }}>Loading....</Text>
      </View>
    );
  }
}

function Favourites({ navigation }) {
  const [getdata, setdata] = React.useState();

  const loadData = async () => {
    console.log('Favourite Load');
    const unparse = await AsyncStorage.getItem('fav');
    console.log('unparse--' + unparse);

    const parsed = JSON.parse(unparse);
   // console.log('Parsed is ' + parsed[0].country);

    setdata(parsed);

    for (var i = 0; i < parsed.length; i++) {
      console.log('Parsed is- ' + parsed[i].country);
    }
  };

  React.useEffect(() => {
    loadData();
  });
   state = {
      rating: 1,
    };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={getdata}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.tile1}>
            <Text style={{ color: 'grey', fontSize: 16 }}>{item.country}</Text>
            <TouchableOpacity onPress={async(key)=>
              {
                console.log("Remove"+item.country)
                //console.log("Remove len"+item.length)
                const rem1=[];
                const rem2=getdata;
                console.log("Remo2 len"+rem2.length)
                
                for(var i=0;i<rem2.length;i++){
                  if(rem2[i].country!=item.country){
                    rem1.push(rem2[i])
                  }
                }
                console.log("Remo1 len"+rem1.length)
                /*for(var j=0;j<rem1.length;j++){
                  console.log("country z "+rem1[j].country)
                }*/
                await AsyncStorage.setItem(
                        'fav',
                        JSON.stringify(rem1)
                      ); 

                    //  const unparse = await AsyncStorage.getItem('fav');
                    //  console.log('unparse--z-' + unparse);

                    //  const parsed = JSON.parse(unparse);
                    //   console.log('Parsed is ' + parsed[0].country);

                    // const data1 = rem1[0];
                    // console.log('d is ' + data1);


                    // if (parsed == null) {
                    //   console.log('ssssssssssssssss' + parsed);
                    //   await AsyncStorage.setItem(
                    //     'fav',
                    //     JSON.stringify([data1])
                    //   );
                    // } else {
                    //   console.log('wwwwwwwwwwwwwwwwwwwwww' + parsed);
                    //   await AsyncStorage.setItem(
                    //     'fav',
                    //     JSON.stringify([...parsed, data1])
                    //   );
                    // }
                  
                

                await AsyncStorage.removeItem(item.country);}
            }>
            <Star filled={this.state.rating ? true : false} />
           </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function CountriesData({ route, navigation }) {
  const countryName = route.params;
  console.log('Country Name' + countryName['item']);

  const [isRefreshing, setRefreshing] = React.useState(false);
  const [getconfirm, setData] = useState();
  const [getrecover, setrecover] = useState();
  const [getdeath, setdeath] = useState();
  const [getactive, setactive] = useState();
  var country = countryName['item'];

  useEffect(() => {
    console.log('-------ee---Country Name' + country);
    getData(country);
  }, [setData]);

  const getData = async (country) => {
    console.log('----------Country Name------------' + country);
    //#1e1e1e
    fetch(
      `https://covid-19-data.p.rapidapi.com/report/country/name?name=${country}&date=2020-04-01`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
          'x-rapidapi-key':
            '571fc46971msh4a206c6c2362c31p153b3cjsn94e3abf1288d',
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('rrrr' + result[0].provinces[0].confirmed);

        setData(result[0].provinces[0].confirmed);
        setrecover(result[0].provinces[0].recovered);
        setdeath(result[0].provinces[0].deaths);
        setactive(result[0].provinces[0].active);
        console.log('set ' + getconfirm + 'dddddddddd');
        setRefreshing(false);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };
  getData(country);
  return (
    <View style={styles.container}>
      <Text style={{ color: 'grey', fontSize: 16 }}>
        Confirmed:{getconfirm}
      </Text>
      <Text style={{ color: 'grey', fontSize: 16 }}>
        Recovered:{getrecover}
      </Text>
      <Text style={{ color: 'grey', fontSize: 16 }}>Deaths:{getdeath}</Text>
      <Text style={{ color: 'grey', fontSize: 16 }}>
        Active Cases:{getactive}
      </Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Available Countries"
        component={CountriesNameScreen}
      />
      <Stack.Screen name="CountryData" component={CountriesData} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World">
        <Drawer.Screen name="World" component={WorldScreen} />
        <Drawer.Screen name="CountriesWise" component={Root} />
        <Drawer.Screen name="Favourites" component={Favourites} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
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
