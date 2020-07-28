import React from "react";
import {graphql} from "react-apollo"
import gql from "graphql-tag"
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import Loader from "../Loader";
import AdminCard from "../AdminCard";
import WithdrawModal from "./WithdrawModal";
import {WALLET_QUERY} from "./queries";

class WalletPage extends React.PureComponent {
  state = {
    isOpen: false,
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {data: {loading, error, wallet,paymentInfo}} = this.props
    if (loading) return <Loader/>
    if (error) return <h1>{error.message}</h1>

    const {paybillNumber,paybillAccount} = paymentInfo;
    return (
      <MDBContainer className={"px-4"}>
        <h1>Wallet</h1>
        <MDBRow>
          <MDBCol size={"12"} md={"6"} className={"my-2"}>
            <AdminCard value={`Ksh.${wallet.balance}`} title={"Wallet Balance"} iconClass={"fa-money-bill"}/>
          </MDBCol>
          <MDBCol size={"12"} md={"6"} className={"my-2"}>
            <MDBCard className={"my-3 h-100"} style={{borderRadius: "1rem"}}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol size={"12"}>
                    <MDBCardTitle className={"pl-2 pb-2 border-bottom border-grey mb-3"}>
                      Withdraw Money
                    </MDBCardTitle>
                  </MDBCol>
                  <MDBCol size={"12"} className={"text-center"}>
                    <MDBBtn size={"lg"} className={"rounded-pill my-3 mx-5 w-auto"} onClick={this.toggle}>
                      <MDBIcon icon={"cash-register"} className={"mx-4"} size={"1x"}/>
                      WITHDRAW
                    </MDBBtn>
                    <WithdrawModal paybillAccount={paybillAccount} paybillNumber={paybillNumber} balance={wallet.balance} toggle={this.toggle} isOpen={this.state.isOpen}/>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}


export default graphql(
  WALLET_QUERY
)(WalletPage)