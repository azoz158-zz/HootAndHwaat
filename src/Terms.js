import React, { Component } from 'react';
import { ScrollView, FlatList, Image, View, Text, ImageBackground, TextInput, Platform, StyleSheet, I18n, NativeModules } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Segment, Header, Left, Button, Icon, Body, Right, Title, Tabs, Tab, TabHeading, Spinner } from 'native-base';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import axios from 'react-native-axios';
import { observer, inject, computed } from "mobx-react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Pdf from 'react-native-pdf';
import LocalizedStrings from 'react-native-localization';
import PDFView from 'react-native-view-pdf';

@inject("store")
export default class Terms extends Component {
    state = {
        source: null,
        loading: true,
        lang: null,
    }

    componentDidMount() {

        
        this.setState({ lang: NativeModules.ReactLocalization.language.split('-')[0] })

        axios.get("http://hootandhawat-001-site1.ftempurl.com/api/settings", {

        })
            // .then(Response => this.setState({ URstatus: Response.data.signInResult }))
            .then(Response => {

                

                this.setState({ source: Response.data.terms, loading: false })





            })
            .catch(err => console.log(err));

    }

    rendCont = () => {
        if (this.state.loading == true) {
            return (<Spinner />)
        }
        else {
            if (Platform.OS === 'ios') {

                const srcc=this.state.lang == 'ar' ? this.state.source['terms-ar'] : this.state.source['terms-en']
                return (
                    <PDFView
                        fadeInDuration={250.0}
                        style={{ flex: 1 }}
                        resource={ srcc}
                        resourceType={'url'}
                        onLoad={() => console.log('PDF rendered from ')}
                        onError={(error) => console.log('Cannot render PDF', error)}
                    />
                )
            }
            else {
                return (<Pdf
                    source={{ uri: this.state.lang == 'ar' ? this.state.source['terms-ar'] : this.state.source['terms-en'] }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        
                    }}
                    onError={(error) => {
                       
                    }}
                    style={styles.pdf} />)
            }

        }
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: '#6fc1bb', alignContent: 'center', alignItems: 'center', height: 40, paddingTop: 0 }}>
                    <Left style={{ flex: 1, flexDirection: 'row' }}>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>

                    </Left>
                    <Body>
                        <Title style={{ fontSize: responsiveFontSize(2.5), fontFamily: Platform.OS === 'ios' ? 'CoconNextArabic-Light' : 'Cocon® Next Arabic-Light' }}>{this.props.store.strings.terms}</Title>
                    </Body>
                    <Right>

                        <Button transparent onPress={() => Actions.drawerOpen()}>
                            <Icon name='menu' style={{ color: 'white' }} />
                        </Button>

                    </Right>
                </Header>

                {this.rendCont()}

            </View>
        )
    }
}


const styles = StyleSheet.create({

    pdf: {
        flex: 1,
        width: responsiveWidth(100),
    }
});