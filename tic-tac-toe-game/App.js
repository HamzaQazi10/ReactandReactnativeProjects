import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable,Alert } from 'react-native';

export default function App() {
const[getMark,setMark]=useState({n1:"#",n2:"#",n3:"#",n4:"#",n5:"#",n6:"#",n7:"#",n8:"#",n9:"#"});
const[getPlayer,setPlayer]=useState("1");

const Players=()=>{  
  if(getPlayer=="1"){
    setPlayer("2");  
  }
  else{
    setPlayer("1");
  }
  console.log(getPlayer);
}




const SetMark1=(name)=>{
  setMark({n1:name,n2:getMark.n2, n3:getMark.n3, n4:getMark.n4, n5:getMark.n5, n6:getMark.n6, n7:getMark.n7, n8:getMark.n8, n9:getMark.n9});
  Players();
  
}

const SetMark2=(name)=>{
  setMark({n1:getMark.n1,n2:name,n3:getMark.n3, n4:getMark.n4, n5:getMark.n5, n6:getMark.n6, n7:getMark.n7, n8:getMark.n8, n9:getMark.n9});
  Players();
}
const SetMark3=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:name, n4:getMark.n4, n5:getMark.n5, n6:getMark.n6, n7:getMark.n7, n8:getMark.n8, n9:getMark.n9});
  Players();
}

const SetMark4=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:getMark.n3, n4:name, n5:getMark.n5, n6:getMark.n6, n7:getMark.n7, n8:getMark.n8, n9:getMark.n9});
  Players();
}
const SetMark5=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:getMark.n3, n4:getMark.n4, n5:name, n6:getMark.n6, n7:getMark.n7, n8:getMark.n8, n9:getMark.n9});
  Players();
}
const SetMark6=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:getMark.n3, n4:getMark.n4, n5:getMark.n5, n6:name, n7:getMark.n7, n8:getMark.n8, n9:getMark.n9});
  Players();
}

const SetMark7=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:getMark.n3, n4:getMark.n4, n5:getMark.n5, n6:getMark.n6, n7:name, n8:getMark.n8, n9:getMark.n9});
  Players();
}
const SetMark8=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:getMark.n3, n4:getMark.n4, n5:getMark.n5, n6:getMark.n6, n7:getMark.n7, n8:name, n9:getMark.n9});
  Players();
}
const SetMark9=(name)=>{
  setMark({n1:getMark.n1,n2:getMark.n2,n3:getMark.n3, n4:getMark.n4, n5:getMark.n5, n6:getMark.n5, n7:getMark.n7, n8:getMark.n8, n9:name});
  Players();
}

const Turn=()=>{
  var a="Player Turn  "+getPlayer;
  return a;
}

const CheckWin=()=>{
  //var a="Player Turn  "+getPlayer;
  if((getMark.n1=='1' && getMark.n2=='1' && getMark.n3=='1') || (getMark.n4=='1' && getMark.n5=='1' && getMark.n6=='1') || (getMark.n7=='1' && getMark.n8=='1' && getMark.n9=='1') || (getMark.n1=='1' && getMark.n4=='1' && getMark.n7=='1') || (getMark.n2=='1' && getMark.n5=='1' && getMark.n8=='1') || (getMark.n3=='1' && getMark.n6=='1' && getMark.n9=='1') || (getMark.n1=='1' && getMark.n5=='1' && getMark.n9=='1') || (getMark.n3=='1' && getMark.n5=='1' && getMark.n7=='1')){
    //a="Player 1 wins";
    Alert.alert("Player 1 Wins");
    setMark({n1:"#",n2:"#",n3:"#",n4:"#",n5:"#",n6:"#",n7:"#",n8:"#",n9:"#"})
  }
  else if((getMark.n1=='2' && getMark.n2=='2' && getMark.n3=='2') || (getMark.n4=='2' && getMark.n5=='2' && getMark.n6=='2') || (getMark.n7=='2' && getMark.n8=='2' && getMark.n9=='2') || (getMark.n1=='2' && getMark.n4=='2' && getMark.n7=='2') || (getMark.n2=='2' && getMark.n5=='2' && getMark.n8=='2') || (getMark.n3=='2' && getMark.n6=='2' && getMark.n9=='2') || (getMark.n1=='2' && getMark.n5=='2' && getMark.n9=='2') || (getMark.n3=='2' && getMark.n5=='2' && getMark.n7=='2')){
    
    //a="Player 2 wins";
    Alert.alert("Player 2 Wins");
    setMark({n1:"#",n2:"#",n3:"#",n4:"#",n5:"#",n6:"#",n7:"#",n8:"#",n9:"#"})
  }
  
}

  return (
    <View style={styles.container}>
      <Text style={{fontWeight:"bold"}}>{CheckWin(),Turn()}</Text>
 
<View style={{flexDirection:"row",marginLeft:"15%"}}>
      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark1.bind(this,getPlayer)} >
      <Text style={{textAlign:"center"}} >{getMark.n1}</Text>
      </Pressable>
      </View>

      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark2.bind(this,getPlayer)}  >
      <Text style={{textAlign:"center"}} >{getMark.n2}</Text>
      </Pressable>
      </View>
      
      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark3.bind(this,getPlayer)}  >
      <Text style={{textAlign:"center"}} >{getMark.n3}</Text>
      </Pressable>
      </View>
    </View>

    <View style={{flexDirection:"row",marginLeft:"15%"}}>
      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark4.bind(this,getPlayer)} >
      <Text style={{textAlign:"center"}} >{getMark.n4}</Text>
      </Pressable>
      </View>

      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark5.bind(this,getPlayer)}  >
      <Text style={{textAlign:"center"}} >{getMark.n5}</Text>
      </Pressable>
      </View>
      
      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark6.bind(this,getPlayer)}  >
      <Text style={{textAlign:"center"}} >{getMark.n6}</Text>
      </Pressable>
      </View>
    </View>

    <View style={{flexDirection:"row",marginLeft:"15%"}}>
      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark7.bind(this,getPlayer)} >
      <Text style={{textAlign:"center"}} >{getMark.n7}</Text>
      </Pressable>
      </View>

      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark8.bind(this,getPlayer)}  >
      <Text style={{textAlign:"center"}} >{getMark.n8}</Text>
      </Pressable>
      </View>
      
      <View style={{flexDirection:"row",marginTop:"20%"}}>
      <Pressable style={{backgroundColor:"#5DD0ED",width:"30%",height:"100%", justifyContent:"space-between"}} onPress={SetMark9.bind(this,getPlayer)}  >
      <Text style={{textAlign:"center"}} >{getMark.n9}</Text>
      </Pressable>
      </View>
    </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
