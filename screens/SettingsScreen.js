import React from 'react';
import {Text , View ,KeyboardAvoidingView, TextInput , TouchableOpacity ,StyleSheet} from 'react-native';
import firebase  from 'firebase';
import MyHeader from '../components/MyHeader';
import db from '../config';

export default class SettingsScreen extends React.Component{ 
    constructor(){
        super();
        this.state={
            emailId : "",
            firstName : "",
            lastName : "",
            address : "",
            contact : "",
            docId : ""
        }
    }
    componentDidMount(){
        this.getUserDetails()
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection("users").where("email_id","==",email).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data()
                this.setState({
                    emailId : data.email_id,
                    firstName : data.first_name,
                    lastName: data.last_name,
                    address : data.address,
                    contact : data.contact,
                    docId : doc.id
                })
            })
        })  
    }
    updateUserDetails=()=>{
        db.collection("users").doc(this.state.docId).update({
            first_name:this.state.firstName,
            last_name : this.state.lastName,
            address:this.state.address,
            contact : this.state.contact
        })
        alert("Profile Updated Successfully")
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <TextInput style={styles.formTextInput}
                    placeholder="First Name"
                    onChangeText={(text)=>{
                        this.setState({
                            firstName : text
                        })
                    }}
                    value={this.state.firstName}
                    maxLength={8}/>

                    <TextInput style={styles.formTextInput}
                    placeholder="Last Name"
                    onChangeText={(text)=>{
                        this.setState({
                            lastName : text
                        })
                    }}
                    value={this.state.lastName}
                    maxLength={8}/>

                    <TextInput style={styles.formTextInput}
                    placeholder={"Address"}
                    onChangeText={(text)=>{
                        this.setState({
                            address : text
                        })
                    }}
                    value={this.state.address}
                    multiline={true}/>

                    <TextInput style={styles.formTextInput}
                    placeholder={"Contact"}
                    onChangeText={(text)=>{
                        this.setState({
                            contact : text
                        })
                    }}
                    value={this.state.contact}
                    keyboardType={"numeric"}
                    maxLength={10}/>

                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.updateUserDetails()
                    }}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )  
    }
}


const styles = StyleSheet.create({ container : { flex:1, alignItems: 'center', justifyContent: 'center' }, formContainer:{ flex:1, width:'100%', alignItems: 'center' }, formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, buttonText:{ fontSize:25, fontWeight:"bold", color:"#fff" } })