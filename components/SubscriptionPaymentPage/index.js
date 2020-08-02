import React from "react";
import {MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import Loader from "../Loader";
import PaymentForm from "./components/PaymentForm";
import {StepContainer, StepItem} from "./components";
import ChooseAmountForm from "./components/ChooseAmountForm";
import PaymentLoginForm from "./components/PaymentLoginForm";
import {SUBSCRIPTION_QUERY} from "./queries";

class SubscriptionPaymentPage extends React.PureComponent {
  state = {
    collapseID: "login",
    finished: [],
    interval: "",
    frequency: 1,
    amount: "",
    phone: "",
    success: false
  }

  changeHandler = object => {
    this.setState(object)
  }
  toggleCollapse = collapseID => () => {
    let valid = false;
    if (collapseID === 'login') {
      valid = true;
    }
    if (collapseID === 'amount') {
      if (this.state.finished.includes('login')) {
        valid = true;
      }
    }
    if (collapseID === 'finish') {
      if (this.state.finished.includes('login') && this.state.finished.includes('amount')) {
        valid = true;
      }
    }
    if ((this.state.collapseID !== collapseID) && valid) {
      this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
      }));
    }
  }
  nextStep = currentStep => {
    return step => {
      const finished = this.state.finished
      if (!finished.includes(currentStep))
        finished.push(currentStep)
      this.setState({
        finished,
        collapseID: step
      })
    }
  }

  render() {
    const {data: {error, loading, subscription, user}} = this.props;
    if (error)
      return <h1>{error.message}</h1>

    if (loading)
      return <Loader/>
    if (!subscription)
      return <h1>NO SUBSCRIPTION CONFIGURED</h1>

    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol size={"12"}>
            <StepContainer>
              <StepItem id={"login"}
                        toggle={this.toggleCollapse}
                        name={"Login"}
                        currentID={this.state.collapseID}
                        icon={className => (<MDBIcon icon={"user"} className={className}/>)}>
                <PaymentLoginForm subscription={subscription} user={user} nextStep={this.nextStep('login')}/>
              </StepItem>
              <StepItem id={"amount"}
                        toggle={this.toggleCollapse}
                        name={"Set Payment Amount"}
                        currentID={this.state.collapseID}
                        icon={className => (<MDBIcon icon={"edit"} className={className}/>)}>
                <p>
                  Input the amount of money you want to pay for this course.
                  Which will be charged at the rate of {subscription.price} Per Week.
                </p>
                <ChooseAmountForm subscription={subscription}
                                  onChange={this.changeHandler}
                                  nextStep={this.nextStep('amount')}/>
              </StepItem>
              <StepItem id={"finish"}
                        toggle={this.toggleCollapse}
                        name={"Finish Payment"}
                        currentID={this.state.collapseID}
                        icon={className => (<MDBIcon icon={"user"} className={className}/>)}>
                <PaymentForm subscription={subscription}
                             amount={this.state.amount}
                             frequency={this.state.frequency}
                             interval={this.state.interval}
                             onChange={this.changeHandler}
                             nextStep={this.nextStep('finish')}/>
              </StepItem>
            </StepContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default withRouter(
  compose(
    graphql(SUBSCRIPTION_QUERY, {
      options: (props) => {
        const {subscriptionId} = props.router.query;
        return {
          variables: {subscriptionId}
        }
      }
    }),
  )(SubscriptionPaymentPage)
)