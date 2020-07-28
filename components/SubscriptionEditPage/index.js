import React from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow} from 'mdbreact';
import {MutationForm} from "../Form";
import {Field} from "../FIeld";
import {withRouter} from "next/router";
import compose from "lodash.flowright";
import {graphql} from "react-apollo";
import {EDIT_SUBSCRIPTION_MUTATION, SUBSCRIPTION_QUERY} from "./queries";
import Loader from "../Loader";
import {SUBSCRIPTIONS_QUERY} from "../SubscriptionsPage/queries";
import {NextSeo} from "next-seo";

class SubscriptionEditPage extends React.PureComponent {

  state = {
    name: "",
    description: "",
    price: "",
    errors: [],
    submitted: false
  }

  completeHandler = ({editSubscription: {subscription, errors}}) => {
    if (subscription) {
      // redirect to subscription page
      this.props.router.push(
        `/member/subscriptions/[subscriptionId]`,
        `/member/subscriptions/${subscription.id}`)
    } else {
      // set loading state to false
      this.setState({
        loading: false,
        submitted: true,
        errors: errors
      })
    }
  };

  changeHandler = object => {
    this.setState(object)
  };

  getFormData = () => {
    const {name, price, description} = this.state;
    let {data: {subscription}} = this.props;
    subscription = subscription ? subscription : {}
    const {subscriptionId} = this.props.router.query;
    return {
      id: subscriptionId ? subscriptionId : undefined,
      name: name ? name : subscription.name,
      price: price ? price : subscription.price,
      description: description ? description : subscription.description
    }
  };

  mutationOptions = {
    refetchQueries: [{query: SUBSCRIPTIONS_QUERY}]
  };

  render() {

    const {data: {error, loading, subscription}} = this.props;

    if (error)
      return <h1>{error.message}</h1>

    if (loading)
      return <Loader/>
    const {submitted, errors} = this.state;
    return (
      <>
        <NextSeo title={subscription ?  `Edit ${subscription.name}` : "Add Subscription"}/>
        <MDBContainer className={"pr-5"}>
          <MDBRow center>
            <MDBCol size={"11"} md={"10"}>
              <h1 className={"text-center"}>{subscription ? subscription.name : "Add Subscription"}</h1>
              <MutationForm data={this.getFormData()}
                            onCompleted={this.completeHandler}
                            mutation={EDIT_SUBSCRIPTION_MUTATION}
                            mutationOptions={this.mutationOptions}>
                <MDBRow center>
                  <MDBCol size={"12"}>
                    <Field
                      submitted={submitted}
                      label={"Subscription Name"}
                      initial={subscription ? subscription.name : ""}
                      required
                      fieldErrors={errors.name}
                      onChange={
                        e => this.changeHandler(
                          {name: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <Field
                      rows={"4"}
                      type={"textarea"}
                      submitted={submitted}
                      label={"Subscription Description"}
                      initial={subscription ? subscription.description : ""}
                      required
                      fieldErrors={errors.description}
                      onChange={
                        e => this.changeHandler(
                          {description: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"} md={"6"}>
                    <p className={"mb-0"} style={{fontSize: "1rem"}}>
                      Set the price you will be charging per week (Sun - Sat) ..eg 100.
                      The value should not be less than 10 shillings
                    </p>
                    <Field
                      min={"10"}
                      type={"number"}
                      submitted={submitted}
                      label={"Weekly Charge in KSH"}
                      initial={subscription ? subscription.price : ""}
                      required
                      fieldErrors={errors.price}
                      onChange={
                        e => this.changeHandler(
                          {price: e.target.value}
                        )
                      }
                    />
                  </MDBCol>
                  <MDBCol size={"12"}/>
                  <MDBCol size={"12"} md={"6"} className={"text-center"}>
                    <MDBBtn className={"rounded-pill"} type={"submit"}>
                      <MDBIcon icon={"money"} className={"mx-2 rounded-pill"}/>
                      SUBMIT
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MutationForm>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
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
    })
  )(SubscriptionEditPage)
)