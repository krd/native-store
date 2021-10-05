import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { Col } from 'react-native-table-component';
import { FlatList } from 'react-native-gesture-handler';
import OrderItem from './OrderItem'
import Icon from 'react-native-vector-icons/Ionicons'

const OrderDetails = props => {

  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);

  const details = props.orderDetails
  const orderDate = new Date(details.date)
  const { items } = details
  const values = Object.values(items)

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

  const renderItem = item => {
    return (
      <OrderItem item={item} />
    )
  }

  return (
    <View>
      <View style={styles.order}>
        <TouchableOpacity onPress={toggleExpanded}>
          <View style={styles.orderContainer}>
            <Text style={styles.orderTotal}>
              ${details.totalAmount ? +details.totalAmount : 'No amount'}
            </Text>
            <Text style={styles.orderText}>
              {orderDate.toLocaleString()}
            </Text>
          </View>
          <View style={styles.orderIcon}>
            <Icon name={collapsed ? 'caret-down' : 'caret-up'} size={18} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={collapsed} align="center">
          <FlatList data={values} renderItem={renderItem} keyExtractor={item => item.id} />
        </Collapsible>
      </View>
    </View>
  )
}
export default OrderDetails

const styles = StyleSheet.create({
  orderContainer: {
    borderColor: Colors.ternary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 40,
  },
  orderIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    fontFamily: 'lato',
    fontSize: 15,
    color: Colors.darkColor
  },
  orderTotal: {
    fontFamily: 'lato-bold',
    fontSize: 16,
    color: 'black',
  },
  order: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    // height: 300,
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    textAlign: 'center',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
})


