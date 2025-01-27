import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    main: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    list:{
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%'
    },
    button:{
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 25,
    },
    item:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        borderStyle: 'solid',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopWidth: 0,
        borderBottomWidth: 1,
    },
    item__name:{
        fontSize: 15,
    },
    title:{
        fontSize: 23,
    },
    header:{
        fontSize: 15,
        fontWeight: 'bold'
    },
    tableHeader:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        width: '100%',
        borderStyle: 'solid',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopWidth: 0,
        borderBottomWidth: 1,
    },
    input:{
        width: 100,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
    },
    inputGroup:{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },

});