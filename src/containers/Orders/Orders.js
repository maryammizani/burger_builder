import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')  // we have already set the URL in our axios module
            .then(res => {
                //console.log(res.data);  
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false, orders: fetchedOrders
                })
            })
            .catch(err => {
                this.setState({loading: false})
            });
    }
    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);