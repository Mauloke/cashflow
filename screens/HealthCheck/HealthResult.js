import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { 
    Block,
    NavBar,
    Icon,
    Input,
    Text,
    Button
} from 'galio-framework';
import theme from '../../theme'
import {Navigation} from 'react-native-navigation'

class HealthResult extends Component{
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidMount(){
        //this.dateSelect(new Date())
        //this.hitDanaDarurat()
    }

    hitDanaDarurat = () => {
        var darurat=0
        for(var item in this.props.asetLancar){
            if(this.props.asetLancar[item]["tambahan"]){
                darurat += Number(this.props.asetLancar[item]["nilai"])
            }
        }
        for(var item in this.props.asetInvestasi){
            if(this.props.asetInvestasi[item]["tambahan"]){
                darurat += Number(this.props.asetInvestasi[item]["nilai"])
            }
        }
        console.log("darurat:"+darurat)
        var ukuran = (darurat + Number(this.props.misc.tabungan))/Number(this.props.misc.pengeluaran)
        console.log("ukuran:"+ukuran)
        return ukuran
        //console.log(darurat)
    }

    hitBayarCicilan =() =>{
        var cicilan=0;
        var penghasilan =0;
        for(var item in this.props.utang){
            if(this.props.utang[item]["tambahan"]){
                cicilan += Number(this.props.utang[item]["tambahan"])
            }
        }
        for(var item in this.props.penghasilan){
            penghasilan += Number(this.props.penghasilan[item]["nilai"])
        }
        
        console.log("cicilan:"+cicilan)
        var ukuran = (cicilan/penghasilan)
        console.log("ukuran:"+ukuran)
        return ukuran
        //console.log(darurat)
    }

    hitMenabung =() =>{
        var ukuran = (Number(this.props.misc.tabungan)/Number(this.props.misc.penghasilan))
        console.log("ukuran:"+ukuran)
        return ukuran
        //console.log(darurat)
    }

    popBack =() =>{
        Navigation.pop('CenterScreen')
      }
    render(){
        return(
            <Block safe flex>
                <NavBar
                title="Health Check Result"
                left={(
                  <TouchableOpacity onPress={this.popBack}>
                    <Icon 
                      name="chevron-left"
                      family="feather"
                      size={theme.SIZES.BASE}
                      color={theme.COLORS.ICON}
                    />
                  </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: 0 } : null}
              />
              <Text h5 style={{}}>ukuran uang tunai:{this.hitDanaDarurat()}</Text>
              <Text h5>Ukuran bayar cicilan:{this.hitBayarCicilan()}</Text>
              <Text h5>Ukuran menabung:{this.hitMenabung()}</Text>
              
            </Block>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user,
        asetLancar: state.account.asetLancar,
        asetInvestasi: state.account.asetInvestasi,
        asetGuna: state.account.asetGuna,
        utang: state.account.utang,
        modal: state.account.modal,
        misc: state.misc,
        penghasilan: state.account.penghasilan,
    }
}
export default connect(mapStateToProps,null)(HealthResult);