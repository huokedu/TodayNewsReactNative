/**
 * Created by lawrence on 2017/1/17.
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ListView,
    TouchableHighlight,
} from 'react-native';

import Constants from '../../common/Constants';
import PersonalHeader from '../../views/personal/PersonalHeader';
import PersonalFavorite from './PersonalFavorite';

export default class Personal extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            dataSource: ds.cloneWithRowsAndSections({
                notice: ['消息通知'],
                store: ['头条商城', '京东特供'],
                my: ['我要爆料', '用户反馈', '系统设置']
            })
        };

        //bind
        this._renderRow = this._renderRow.bind(this);
        this._renderSeparator = this._renderSeparator.bind(this);
        this._renderSectionHeader = this._renderSectionHeader.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={() => <PersonalHeader name='CoderLawrence' clickButton={() => this.clickButton()}/>}
                    renderSectionHeader={this._renderSectionHeader}
                >
                </ListView>
            </View>
        )
    }

    _renderRow(rowData, sectionID, rowID, highlightRow:(sectionId, rowId) => void) {
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowID);
                highlightRow(sectionID, rowID);
            }} activeOpacity={0.7}>
                <View style={{height: 50, justifyContent: 'center'}}>
                    <Text style={{marginLeft: 10}}>{rowData}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}:${rowID}`}
                style={{height: 1, backgroundColor: '#e5e5e5'}}
            >
            </View>
        );
    }

    _renderSectionHeader(sectionID) {
        return (
            <View key={sectionID} style={{height: 10, backgroundColor: '#e5e5e5'}}></View>
        );
    }

    _pressRow(rowID) {
        alert('你啊')
    }

    clickButton() {
        this.props.navigator.push({
            title: '收藏历史',
            component: PersonalFavorite,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

})