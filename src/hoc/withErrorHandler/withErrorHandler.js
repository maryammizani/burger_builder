import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {   //Anonymous class
        state = {
            error: null
        }
        componentWillMount () {
            // set the error to null (default) before receiving the response
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req; // without this, the req will not continue
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, 
                // without returning the response, the res will not continue
                error => {  
                this.setState({error: error});
                return 
            });
        }

        componentWillUnmount () {
            //console.log('componentWillUnmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }

    }
}
export default withErrorHandler;