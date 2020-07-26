import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const callback = (json) => {
            setUsers([...users, ...json.results])
            setLoading(false)
            return json.results;
        }

        fetchUsers(callback)
    }, []);

    const fetchUsers = (callback) => {
        setLoading(true);

        return fetch('https://randomuser.me/api/?results=5')
            .then((response) => response.json())
            .then(callback)
            .catch((error) => {
                console.error(error);
            });
    };

    const handleClickUser = (id) => {
        alert(`User ID: ${id}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: 70, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e25b28', paddingTop: 10}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>Users</Text>
            </View>
            {
                <FlatList
                    contentContainerStyle={{paddingVertical: 10, justifyContent: 'center'}}
                    style={{width: '100%', height: '100%', paddingBottom: '25%'}}
                    numColumns={1}
                    data={users}
                    refreshing={loading}
                    onEndReachedThreshold={0.5}
                    onEndReached = {({distanceFromEnd})=>{ 
                        const callback = (json) => {
                            setUsers([...users, ...json.results])
                            setLoading(false)
                            return json.results;
                        }
                
                        fetchUsers(callback)
                    }}
                    onRefresh = {() => {
                        const callback = (json) => {
                            setUsers(json.results)
                            setLoading(false)
                            return json.results;
                        }
                
                        fetchUsers(callback)
                    }}
                    renderItem={
                        ({ item }) => (
                            <View style={[styles.userCard, styles.boxShadow]}>
                                <TouchableOpacity 
                                    style={{width: '100%', height: '100%'}}
                                    onPress={() => handleClickUser(item.login.uuid)}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <Image
                                            resizeMode="contain"
                                            style={{width: 100, height: 100, borderRadius: 100}}
                                            source={{uri: item.picture.large}}
                                        />
                                        <View style={{marginLeft: 20, alignItems: 'flex-start', justifyContent: 'center'}}>
                                            <Text>{item.name.last + ', ' +item.name.first}</Text>
                                            <Text>City: {item.location.city}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    keyExtractor={item => item.login.uuid}
                />
            }
            {
                loading && 
                <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Fetching Data...</Text>
                </View>
            }
        </SafeAreaView>
    )
}

export default UsersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    userCard: {
        height: 130,
        width: '90%',
        marginLeft: '5%',
        marginVertical: 10,
        backgroundColor: '#fafafa',
        padding: 10,
    }, 
    boxShadow: {
        borderColor: '#d9d9d9',
        borderWidth: .5,
        borderRadius: 5,
        shadowColor: "#bdbdbd",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1.5,
        elevation: 2
    },
})