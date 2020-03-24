import React, {Component} from 'react'
import "./index.css"

class Home extends Component {
  render() {

    return (
      <>
        <h1 className={"text-center"}>2020 June Election</h1>
        <h3 className={"text-center"}>How to Vote</h3>
        <div className="col-lg-12 mx-auto">
          <ol className="step pl-0">
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">1</span>
              </div>
              <div className="step-excerpt">
                <h6 className="font-weight-bold dark-grey-text mb-3">Login into your account</h6>
                <p className="text-muted">
                  Login to the application using your google account.After clicking login a screen will pop
                  up and you will be required to give permission use your account for login.
                </p>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">2</span>
              </div>
              <div className="step-excerpt">
                <h6 className="font-weight-bold dark-grey-text mb-3">Select Seat</h6>
                <p className="text-muted">
                  Go to the vote page and select the seat to which you want to vote a candidate from for example:- president
                  click on the seat
                </p>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">3</span>
              </div>
              <div className="step-excerpt">
                <h6 className="font-weight-bold dark-grey-text mb-3">Select Candidate</h6>
                <p className="text-muted">
                  Select the candidate you want to vote for click on the box next to the candidate you want to vote for.
                  After selection a pop up will appear asking you to continue selection or proceed to vote for your candidates in
                  other seats.
                </p>
              </div>
            </li>
            <li className="step-element pb-0">
              <div className="step-number">
                <span className="number">4</span>
              </div>
              <div className="step-excerpt">
                <h6 className="font-weight-bold dark-grey-text mb-3">Finish Voting</h6>
                <p className="text-muted">
                  After voting for your candidate in all seats a pop-up will appear asking if you wish to submit.
                  After submission voting will not be available for the user.Review your choices before submission.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </>
    )//content to be rendered after page load
  }
}

Home.getInitialProps = async ctx => {
  return {
    title: "Voting",
    active: "vote"
  }
};
export default Home;
