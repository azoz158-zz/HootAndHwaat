import React from 'react';
import { Scene, Router, Drawer, Stack, Overlay, ActionConst, Actions } from 'react-native-router-flux';
import Splash from './Splash';
import SelectionScreen from './SelectionScreen';
import UserCat from './User/UserCat'
import UserFish from './User/UserFish'
import SideBar from './SideBar';
import SignIn from './SignIn';
import SignUpSelect from './SignUpSelect';
import RegisterUser from './SignUp/RegisterUser';
import RegisterFisher from './SignUp/RegisterFisher';
import RegisterFisher2 from './SignUp/RegisterFisher2';
import CreateAd from './CreateAd'
import SearchPage from './SearchPage';
import Orders from './Orders'
import FisherAds from './Customer/FisherAds';
import FisherViecles from './Customer/FisherVeicles';
import FisherFishOrders from './Customer/FisherFishOrders';
import FisherTripsOrders from './Customer/FisherTripsOrders';
import UserFishOrders from './User/UserFishOders';
import UserTripsOrders from './User/UserTripsOrders'
import Contact from './Contact';
import Terms from './Terms';
import AddViecle from './Customer/AddViecle';
import Test from './SignUp/Test'

import { responsiveWidth } from 'react-native-responsive-dimensions';
import Profile from './Profile';

const RouterComponent = () => {


    onBackPress = () => {
        
        if (Actions.state.index === 0) {
            return false
        }

        if (Actions.currentScene != 'selectionScreen') {
            Actions.pop()
            return true
        }

    }



    return (
        <Router>
            <Scene key="main" >

                
                <Drawer
                    hideNavBar
                    key="drawer"
                    contentComponent={SideBar}
                    drawerWidth={responsiveWidth(55)}
                    drawerPosition="right"
                >
                
                    <Scene key="selectionScreen" component={SelectionScreen} hideNavBar type={ActionConst.REPLACE}></Scene>
                    <Scene key="userFish" component={UserFish} hideNavBar></Scene>
                    <Scene key="registerFisher" component={RegisterFisher} hideNavBar></Scene>
                    <Scene key="userCat" component={UserCat} hideNavBar ></Scene>
                    <Scene key="createAd" component={CreateAd} hideNavBar ></Scene>
                    <Scene key="fisherViecles" component={FisherViecles} hideNavBar></Scene>
                    <Scene key="fisherAds" component={FisherAds} hideNavBar></Scene>
                    <Scene key="userFishOrders" component={UserFishOrders} hideNavBar></Scene>
                    <Scene key="userTripsOrders" component={UserTripsOrders} hideNavBar></Scene>
                    <Scene key="profile" component={Profile} hideNavBar ></Scene>
                    <Scene key="signIn" component={SignIn} hideNavBar></Scene>
                    <Scene key="terms" component={Terms} hideNavBar ></Scene>
                    <Scene key="contact" component={Contact} hideNavBar ></Scene>
                    <Scene key="fisherTripsOrders" component={FisherTripsOrders} hideNavBar></Scene>
                    <Scene key="fisherFishOrders" component={FisherFishOrders} hideNavBar></Scene>
                    <Scene key="fisherOrdes" component={FisherFishOrders} hideNavBar></Scene>
                    <Scene key="userCat" component={UserCat} hideNavBar></Scene>
                    
                </Drawer>
                <Scene key="addViecle" component={AddViecle} hideNavBar></Scene>
                <Scene key="splash" component={Splash} hideNavBar initial></Scene>

                

                <Scene key="registerUser" component={RegisterUser} hideNavBar></Scene>
                <Scene key="searchPage" component={SearchPage} hideNavBar></Scene>
                




                <Scene key="signUpSelect" component={SignUpSelect} hideNavBar></Scene>




            </Scene>
        </Router>
    )
}

export default RouterComponent;