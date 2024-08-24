import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem, TextInput, Alert } from 'react-native';
import { Title, Message } from '../../components/Text';
import { Button, ClickableText } from '../../components/Button';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';
import axios from 'axios';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;
type UsersTableRouteProp = RouteProp<RootStackParamList, 'Edit Users'>;
type UsersTableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Edit Users'>;

type Props = {
    route: UsersTableRouteProp;
};

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

const EditUsersPage = ({ route }: Props) => {
    const navigation = useNavigation<UsersTableNavigationProp>();
    const [message, setMessage] = useState("");
    const { users, firstName, email } = route.params;

    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredUsers = users
        .filter((user: { firstName: string; lastName: string; email: string; }) =>
            user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a: { firstName: string; }, b: { firstName: string; }) => {
            if (a.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())) return -1;
            if (b.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())) return 1;
            return 0;
        });


    const onBackPressed = () => {
        navigation.navigate('HomeAdmin', { firstName, email });
    };

    const onDeletePressed = async (email: string) => {
        try {
            const response = await axios.post(`${URL}/user/deleteUser`, { email });
            setMessage(response.data.message);
            const Users = await axios.get(`${URL}/user/getAllUser`,);
            setMessage(Users.data.message);
            // const { firstName, email } = route.params;
            const users = Users.data;
            navigation.navigate('Edit Users', { users, firstName, email });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'An error occurred');
            } else {
                setMessage('An unknown error occurred');
            }
        }
    };

    const showDeleteConfirmation = (user: User) => {
        Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => onDeletePressed(user.email),
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem: ListRenderItem<User> = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.firstName}</Text>
            <Text style={styles.cell}>{item.lastName}</Text>
            <Text style={styles.cell}>{item.email}</Text>
            <View style={{ flex: 1 }}>
                <Button onPress={() => showDeleteConfirmation(item)} text="Delete" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Title text='Edit Users' type='' />
            </View>
            {message ? <Message text={message} /> : null}
            <TextInput
                style={styles.searchInput}
                placeholder="Search users..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <View style={styles.header}>
                <Text style={styles.headerCell}>First name</Text>
                <Text style={styles.headerCell}>Last name</Text>
                <Text style={styles.headerCell}>Email</Text>
                <Text style={styles.headerCell}></Text>
            </View>
            <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={(item) => item.email}
                style={styles.list}
            />
            <View style={styles.buttons}>
                <ClickableText
                    onPress={onBackPressed}
                    text="Back"
                    type="Forgot"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleView: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    searchInput: {
        margin: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#443532',
        borderRadius: 4,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        paddingBottom: 8,
        width: '90%',
        alignSelf: 'center',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
    },
    buttons: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
    }
});

export default EditUsersPage;
