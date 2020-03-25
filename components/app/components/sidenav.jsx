import React from 'react';
import {MDBBtn, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem} from "mdbreact";
import Router, {useRouter} from 'next/router'
import {SideNav} from "../../global/sidenav";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {APP_QUERY} from "../queries";

const redirect = (href) => {
  Router.push(href);
};

const getSideNavChildren = (listClass, pathname, user, logout) => {

  if (user) {
    return (
      <MDBListGroup>
        <SideNavItem pathname={pathname} className={listClass} href={"/"}>
          <MDBIcon icon={"home"} className={"mr-2"}/>
          Home
        </SideNavItem>
        <SideNavItem pathname={pathname} className={listClass} href={"/account"}>
          <MDBIcon far icon={"user"} className={"mr-2"}/>
          My Account
        </SideNavItem>
        <SideNavItem pathname={pathname} className={listClass} href={"/vote"}>
          <MDBIcon fas icon={"person-booth"} className={"mr-2"}/>
          Vote
        </SideNavItem>
        <SideNavItem pathname={pathname} isLogout className={`${listClass} bg-warning my-5`} href={"/#"}>
          <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
          Logout
        </SideNavItem>
      </MDBListGroup>
    )
  }
  return (
    <MDBListGroup>
      <SideNavItem pathname={pathname} className={listClass} href={"/"}>
        <MDBIcon icon={"home"} className={"mr-2"}/>
        Home
      </SideNavItem>
      <SideNavItem pathname={pathname} className={listClass} href={"/login"}>
        <MDBIcon fas icon={"sign-in-alt"} className={"mr-2"}/>
        Login/Register
      </SideNavItem>
    </MDBListGroup>
  )
};

function SideNavItem(props) {
  const {pathname, className, children, href,isLogout} = props;
  const [logout, {data}] = useMutation(gql`
      mutation Logout{
        logout @client
      }
    `);
  const onClick = () => {
    if (isLogout)
      logout({
        refetchQueries: [
          {query: APP_QUERY}
        ]
      });
    else
      redirect(href)
  };
  return (
    <MDBListGroupItem active={pathname === href} hover className={className} onClick={onClick}>
      {children}
    </MDBListGroupItem>
  )
}

function MainSideNav(props) {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;
  const {pathname} = useRouter();
  const children = getSideNavChildren;
  return (
    <>
      <MDBBtn className={"position-fixed d-md-block d-lg-none rounded-pill hover-fade"}
              style={{
                zIndex: 1,
                display: isOpen ? "none!important" : "",
                left: "1rem"
              }}
              onClick={toggleFunction}>
        <MDBIcon icon={"bars"}/>
      </MDBBtn>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black z-depth-1"}>
        {children(listClassSide, pathname, user)}
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block my-auto z-depth-1 f-100"}>
        <div className={"mt-5 rounded f-50 h-100"}>
          {children(listClass, pathname, user)}
        </div>
      </MDBCol>
    </>
  )
}

export default MainSideNav