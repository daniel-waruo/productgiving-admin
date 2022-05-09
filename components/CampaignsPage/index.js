import React, {Component} from "react";
import {MDBContainer, MDBNav, MDBNavItem, MDBTabContent, MDBTabPane} from "mdbreact";
import NavLink from "../NavLink";
import CampaignListPage from "../CampaignListPage";
import ApprovedCampaignListPage from "../ApprovedCampaignListPage";
import FeaturedCampaignListPage from "../FeaturedCampaignListPage";
import UnapprovedCampaignListPage from "../UnapprovedCampaignListPage";

class CampaignsPage extends Component {
  state = {
    activeItem: "1"
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <NavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab">
              All
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab">
              Approved
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink link to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab">
              Un Approved
            </NavLink>
          </MDBNavItem>
          <MDBNavItem>
            <NavLink link to="#" active={this.state.activeItem === "4"} onClick={this.toggle("4")} role="tab">
              Featured
            </NavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="1" role="tabpanel" style={{minHeight: "100vh"}}>
            <CampaignListPage/>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel" style={{minHeight: "100vh"}}>
            <ApprovedCampaignListPage/>
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel" style={{minHeight: "100vh"}}>
            <UnapprovedCampaignListPage/>
          </MDBTabPane>
          <MDBTabPane tabId="4" role="tabpanel" style={{minHeight: "100vh"}}>
            <FeaturedCampaignListPage/>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}

export default CampaignsPage;
