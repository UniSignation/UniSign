import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import Title from '../../components/Text/Title';
import { Button, ClickableText } from '../../components/Button';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../components/navigation';
const URL = `${process.env.BASE_URL}:${process.env.EXPRESS_PORT}`;

type UsersTableRouteProp = RouteProp<RootStackParamList, 'Users Table'>;
type UsersTableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Users Table'>;

type Props = {
    route: UsersTableRouteProp;
};

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

const UsersTablePage = ({ route }: Props) => {
    const navigation = useNavigation<UsersTableNavigationProp>();
    const {users, firstName, email} = route.params; 
    const onEditPressed = () => {
        navigation.navigate('Edit Users', {users, firstName, email});
    };

    const onBackPressed = () => {
        navigation.navigate('HomeAdmin', { firstName, email});
    };
    
    const renderItem: ListRenderItem<User> = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.firstName}</Text>
            <Text style={styles.cell}>{item.lastName}</Text>
            <Text style={styles.cell}>{item.email}</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Title text='Users' type='' />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerCell}>First name</Text>
                <Text style={styles.headerCell}>Last name</Text>
                <Text style={styles.headerCell}>Email</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={(item) => item.email}
                style={styles.list}
            />
            <View style={styles.buttons}>
                <Button onPress={onEditPressed} text="edit" />
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
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    header: {
        flexDirection: 'row',
        borderBottomWidth:2,
        paddingBottom: 8,
        width: '90%',
        alignSelf: 'center',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        fontSize:16,
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
        fontSize:15,
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
    }
});

export default UsersTablePage;
