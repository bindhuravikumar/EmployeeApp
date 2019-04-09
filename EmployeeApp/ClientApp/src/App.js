import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { AddEmployee } from './components/AddEmployee';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={FetchData} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/addemployee' component={AddEmployee} />
            <Route path='/employee/edit/:empid' component={AddEmployee} />  
      </Layout>
    );
  }
}
